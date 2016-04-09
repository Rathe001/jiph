let modAdSets = angular.module('modAdSets');

modAdSets.controller('ctrlAdSets', ['$scope', '$routeParams', 'AdSets', 'Accounts', 'Dictionary', 'Currency', 'DateIntervals', 'Campaigns',
    function($scope, $routeParams, AdSets, Accounts, Dictionary, Currency, DateIntervals, Campaigns) {
        let vm = this;
        let campaignId = $routeParams.campaignId;

        vm.adSets = [];
        vm.columns = {};
        vm.dictionary = {};
        vm.currency = {};
        vm.orderBy = "";
        vm.error = "";
        vm.dateIntervals = [];
        vm.selectedInterval = "";
        vm.campaign = {};

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
            }
        });

        _init();

        function _init() {
            vm.dictionary = Dictionary;
            vm.currency = Currency;
            vm.columns = AdSets.getDataColumns();
            vm.dateIntervals = DateIntervals.intervals;
            vm.selectedInterval = DateIntervals.getSelected();

            if(campaignId) Campaigns.active = campaignId;
        }

        function _getAll() {
            vm.adSets = [];
            vm.error = "";

            AdSets.getAll(Accounts.active, vm.selectedInterval, campaignId).then(response => {
                if(response.data.length > 0) {
                    vm.adSets = _processResponse(response.data);
                } else {
                    vm.error = "No ad sets found.";
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
            AdSets.setDataColumns(vm.columns);
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