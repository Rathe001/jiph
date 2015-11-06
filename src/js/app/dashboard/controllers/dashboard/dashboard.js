(function() {

    'use strict';

    var modDashboard = angular.module('modDashboard');

    modDashboard.controller('ctrlDashboard', ['$timeout', 'Dashboard', 'EstimateTimeToCompletion', 'Accounts', 'Loading',
        function($timeout, Dashboard, EstimateTimeToCompletion, Accounts, Loading) {
            let vm = this;

            vm.accounts = [];
            vm.startDate = moment().subtract(7, 'days').startOf('day').format('YYYY-MM-DD');
            vm.endDate = moment().endOf('day').format('YYYY-MM-DD');

            vm.getCurrency = getCurrency;
            vm.getNumber = getNumber;
            vm.selectAccount = selectAccount;

            _init();

            function _init() {
                Accounts.getAll().then(accounts => {
                    if(accounts && accounts.length > 0) {
                        vm.accounts = accounts;

                        for(let i=0; i< accounts.length; i++) {
                            _getAccountInsights(accounts[i].id);
                        }
                    }
                });

            }

            function _getAccountInsights(accountId) {
                let startTime = Date.now() / 1000 | 0;
                Dashboard.generateReport(accountId, vm.startDate, vm.endDate).then(report => {
                    if(report.report_run_id) {
                        _checkReportStatus(report.report_run_id);
                    }
                });

                function _checkReportStatus(asyncReportId, delay) {
                    Loading.set(true, 'asyncstatus');
                    let currentTime = Date.now() / 1000 | 0;
                    if(!delay) delay = 2000;
                    $timeout(() => {
                        Dashboard.checkReportStatus(asyncReportId).then(status => {
                            if(status.async_status === "Job Completed") {
                                Loading.set(false, 'asyncstatus');
                                _fetchAsyncReport(asyncReportId);
                            } else {
                                delay = EstimateTimeToCompletion.get(startTime, currentTime, status.async_percent_completion);
                                Loading.set(false, 'asyncstatus');
                                _checkReportStatus(asyncReportId, delay);
                            }
                        }, error => {
                            Loading.set(false, 'asyncstatus');
                        })
                    }, delay);

                }

                function _fetchAsyncReport(asyncReportId) {
                    Dashboard.fetchAsyncReport(asyncReportId).then(report => {
                        if(report && report.summary && report.summary.account_id) {
                            Object.assign(vm.accounts.find(account => account.id === "act_" + report.summary.account_id), _processInsights(report));
                        }
                    })
                }
            }

            function _processInsights(input) {
                let currentDate = "";
                let foundDate = {};
                let days = moment(vm.endDate).diff(moment(vm.startDate), 'days');
                let output = input;
                let aryDates = [];

                for(let i=0; i<days; i++) {
                    currentDate = moment(vm.startDate).add(i, 'days').format('YYYY-MM-DD');

                    foundDate = input.data.find(date => date.date_start === currentDate);

                    if(foundDate) {
                        aryDates.push([currentDate, foundDate.spend]);
                    } else {
                        aryDates.push([currentDate, 0]);
                    }
                }

                output.data = aryDates;

                if(!output.summary) {
                    output.summary = {
                        impressions: 0,
                        reach: 0,
                        spend: 0
                    }
                }

                return output;
            }

            function getCurrency(insights, col) {
                let output = 0;

                if(insights && insights.summary && insights.summary[col] && insights.summary[col] !== 0) output = insights.summary[col];

                return output;
            }

            function getNumber(insights, col) {
                let output = 0;

                if(insights && insights.summary && insights.summary[col]) output = insights.summary[col];

                return output;
            }

            function selectAccount(account) {
                Accounts.setActive(account.id);
                $location.url('/campaigns/all');
            }
        }
    ]);
}());
