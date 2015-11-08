let modCampaigns = angular.module('modCampaigns');

modCampaigns.controller('ctrlCampaigns', ['$scope', 'Campaigns', 'Accounts',
    function($scope, Campaigns, Accounts) {
        let vm = this;

        vm.campaigns = [];

        $scope.$watch(() => Accounts.active, newVal => {
            if(newVal){
                _getAll();
            }
        });

        _init();

        function _init() {

        }

        function _getAll() {
            Campaigns.getAll(Accounts.active).then(response => {
                vm.campaigns = response.data;
            })
        }
    }
]);