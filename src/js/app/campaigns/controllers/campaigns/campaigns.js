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

        $scope.$watch(() => Accounts.active, newVal => {
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

            Campaigns.getAll(Accounts.active).then(response => {
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

            for(let i=0; i<input.length; i++) {
                for (let j in input[i]) {
                    switch(j) {
                        case "budget_remaining":
                        case "daily_budget":
                        case "lifetime_budget":
                        case "bid_amount":
                            output[i][j] = parseInt(output[i][j]);
                            break;
                    }
                }
                Object.assign(output, input[i].insights.data[0]);
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