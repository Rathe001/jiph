let modAdSets = angular.module('modAdSets');

modAdSets.controller('ctrlAdSets', ['$scope', 'AdSets', 'Accounts',
    function($scope, AdSets, Accounts) {
        let vm = this;

        vm.adSets = [];

        $scope.$watch(() => Accounts.active, newVal => {
            if(newVal){
                _getAll();
            }
        });

        _init();

        function _init() {

        }

        function _getAll() {
            AdSets.getAll(Accounts.active).then(response => {
                vm.adSets = response.data;
            })
        }
    }
]);