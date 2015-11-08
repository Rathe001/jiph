let modDashboard = angular.module('modDashboard');

modDashboard.controller('ctrlDashboard', ['$q', '$timeout', 'Dashboard', 'EstimateTimeToCompletion', 'Accounts', 'Loading',
    function($q, $timeout, Dashboard, EstimateTimeToCompletion, Accounts, Loading) {
        let vm = this;

        const defaultReport = {
            data: [],
            summary: {}
        };

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
                    _getAccountInsights();
                }
            });

        }

        function _getAccountInsights() {
            let startTime = Date.now() / 1000 | 0;

            for(let i=0; i<vm.accounts.length; i++) {
                Dashboard.generateReport(vm.accounts[i].id, vm.startDate, vm.endDate).then(report => {
                    if (report.report_run_id) {
                        _checkReportStatus(report.report_run_id, vm.accounts[i].id);
                    }
                }, error => {
                    Object.assign(vm.accounts[i], _processInsights(defaultReport));
                    vm.accounts[i].error = error.message;
                });
            }

            function _checkReportStatus(asyncReportId, accountId, delay) {
                Loading.set(true, 'asyncstatus');
                let currentTime = Date.now() / 1000 | 0;
                if(!delay) delay = 2000;
                $timeout(() => {
                    Dashboard.checkReportStatus(asyncReportId).then(status => {
                        if(status.async_status === "Job Completed") {
                            Loading.set(false, 'asyncstatus');
                            _fetchAsyncReport(asyncReportId, accountId);
                        } else {
                            delay = EstimateTimeToCompletion.get(startTime, currentTime, status.async_percent_completion);
                            Loading.set(false, 'asyncstatus');
                            _checkReportStatus(asyncReportId, accountId, delay);
                        }
                    }, error => {
                        Loading.set(false, 'asyncstatus');
                    })
                }, delay);

            }

            function _fetchAsyncReport(asyncReportId, accountId) {
                Dashboard.fetchAsyncReport(asyncReportId).then(report => {
                    if(report && report.summary && report.summary.account_id) {
                        Object.assign(vm.accounts.find(account => account.id === accountId), _processInsights(report));
                    } else {
                        Object.assign(vm.accounts.find(account => account.id === accountId), _processInsights(defaultReport));
                    }
                });
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
        }
    }
]);
