let modAdSets = angular.module('modAdSets');

modAdSets.controller('ctrlAdSets', ['$scope', 'AdSets', 'Accounts', 'Dictionary', 'Currency',
    function($scope, AdSets, Accounts, Dictionary, Currency) {
        let vm = this;

        vm.adSets = [];
        vm.columns = {};
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
            vm.columns = AdSets.getDataColumns();
        }

        function _getAll() {
            vm.adSets = [];
            vm.error = "";

            AdSets.getAll(Accounts.active).then(response => {
                if(response.data.length > 0) {
                    vm.adSets = response.data;
                } else {
                    vm.error = "No ad sets found.";
                }
            }, error => {
                vm.error = error.message;
            });
        }
    }
]);