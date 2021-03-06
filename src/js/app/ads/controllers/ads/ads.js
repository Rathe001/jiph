let modAds = angular.module('modAds');

modAds.controller('ctrlAds', ['$scope', '$routeParams', 'AdSets', 'Ads', 'Accounts', 'Currency', 'Dictionary', 'DateIntervals', 'Campaigns',
    function($scope, $routeParams, AdSets, Ads, Accounts, Currency, Dictionary, DateIntervals, Campaigns) {
        let vm = this;
        let campaignId = $routeParams.campaignId;
        let adSetId = $routeParams.adSetId;

        vm.ads = [];
        vm.columns = {};
        vm.dictionary = {};
        vm.currency = {};
        vm.orderBy = "";
        vm.error = "";
        vm.dateIntervals = [];
        vm.selectedInterval = "";
        vm.campaign = {};
        vm.adSet = {};

        vm.toggleColumn = toggleColumn;
        vm.toggleOrderBy = toggleOrderBy;
        vm.selectInterval = selectInterval;
        vm.getColumnCount = getColumnCount;

        $scope.$watch(() => Accounts.active + vm.selectedInterval, newVal => {
            if(newVal){
                _getAll();
                if(campaignId) {
                    _getCampaign();
                }
                if(adSetId) {
                    _getAdSet();
                }
            }
        });

        _init();

        function _init() {
            vm.currency = Currency;
            vm.dictionary = Dictionary;
            vm.columns = Ads.getDataColumns();
            vm.dateIntervals = DateIntervals.intervals;
            vm.selectedInterval = DateIntervals.getSelected();
        }

        function _getAll() {
            vm.ads = [];
            vm.error = "";

            Ads.getAll(Accounts.active, vm.selectedInterval, campaignId, adSetId).then(response => {
                if(response.data.length > 0) {
                    vm.ads = _processResponse(response.data);
                } else {
                    vm.error = "No ads found.";
                }
            }, error => {
                vm.error = error.message;
            });
        }

        function _getCampaign() {
            Campaigns.active = campaignId;
            Campaigns.get(campaignId, vm.selectedInterval).then(campaign => {
                vm.campaign = campaign;
            });
        }

        function _getAdSet() {
            AdSets.active = adSetId;
            AdSets.get(adSetId, vm.selectedInterval).then(adSet => {
                vm.adSet = adSet;
            });
        }

        function _processResponse(input) {
            let output = input;
            let numTest = "";

            for(let i=0; i<input.length; i++) {
                if(input[i].insights && input[i].insights.data && input[i].insights.data[0]) {
                    Object.assign(output[i], input[i].insights.data[0]);
                }

                for (let j in input[i]) {
                    // Parse all numbers as numbers except dates
                    switch(j) {
                        case "created_time":
                        case "start_time":
                        case "stop_time":
                        case "date_start":
                        case "date_stop":
                        case "updated_time":
                            break;
                        default:
                            numTest = parseFloat(input[i][j]);
                            if(!isNaN(numTest)) input[i][j] = numTest;
                    }
                }
            }

            return output;
        }

        function toggleColumn(col) {
            vm.columns[col] = !vm.columns[col];
            Ads.setDataColumns(vm.columns);
        }

        function toggleOrderBy(col) {
            if(vm.orderBy === col) {
                if(col[0] === "-") {
                    vm.orderBy.replace("-", "");
                } else {
                    vm.orderBy = "-" + col;
                }
            } else {
                vm.orderBy = col;
            }
        }

        function selectInterval(interval) {
            vm.selectedInterval = interval;
            DateIntervals.setSelected(interval);
        }

        function getColumnCount() {
            let count = 1;
            for(let i in vm.columns) {
                if(vm.columns[i]) count++;
            }
            return count;
        }
    }
]);