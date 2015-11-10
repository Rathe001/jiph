let modCampaigns = angular.module('modCampaigns');

modCampaigns.controller('ctrlCampaigns', ['$scope', 'Campaigns', 'Accounts', 'Dictionary', 'Currency', 'DateIntervals',
    function($scope, Campaigns, Accounts, Dictionary, Currency, DateIntervals) {
        let vm = this;

        vm.campaigns = [];
        vm.columns = {};
        vm.dictionary = {};
        vm.currency = {};
        vm.orderBy = "";
        vm.error = "";
        vm.dateIntervals = [];
        vm.selectedInterval = "";

        vm.toggleColumn = toggleColumn;
        vm.toggleOrderBy = toggleOrderBy;
        vm.selectInterval = selectInterval;

        $scope.$watch(() => Accounts.active + vm.selectedInterval, newVal => {
            if(newVal){
                _getAll();
            }
        });

        _init();

        function _init() {
            vm.dictionary = Dictionary;
            vm.currency = Currency;
            vm.columns = Campaigns.getDataColumns();
            vm.dateIntervals = DateIntervals.intervals;
            vm.selectedInterval = DateIntervals.getSelected();
        }

        function _getAll() {
            vm.campaigns = [];
            vm.error = "";

            Campaigns.getAll(Accounts.active, vm.selectedInterval).then(response => {
                if(response.data.length > 0) {
                    vm.campaigns = _processResponse(response.data);
                } else {
                    vm.error = "No campaigns found.";
                }
            }, error => {
                vm.error = error.message;
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
            Campaigns.setDataColumns(vm.columns);
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
    }
]);