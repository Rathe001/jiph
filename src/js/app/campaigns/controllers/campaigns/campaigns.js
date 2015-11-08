let modCampaigns = angular.module('modCampaigns');

modCampaigns.controller('ctrlCampaigns', ['$scope', 'Campaigns', 'Accounts', 'Dictionary', 'Currency',
    function($scope, Campaigns, Accounts, Dictionary, Currency) {
        let vm = this;

        vm.campaigns = [];
        vm.dictionary = {};
        vm.currency = {};
        vm.error = "";

        $scope.$watch(() => Accounts.active, newVal => {
            if(newVal){
                _getAll();
            }
        });

        _init();

        function _init() {
            vm.dictionary = Dictionary;
            vm.currency = Currency;
        }

        function _getAll() {
            vm.campaigns = [];
            vm.error = "";

            Campaigns.getAll(Accounts.active).then(response => {
                if(response.data.length > 0) {
                    vm.campaigns = response.data;
                } else {
                    vm.error = "No campaigns found.";
                }
            }, error => {
                vm.error = error.message;
            });
        }
    }
]);