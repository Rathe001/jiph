let modAds = angular.module('modAds');

modAds.controller('ctrlAds', ['$scope', 'Ads', 'Accounts',
    function($scope, Ads, Accounts) {
        let vm = this;

        vm.ads = [];
        vm.error = "";

        $scope.$watch(() => Accounts.active, newVal => {
            if(newVal){
                _getAll();
            }
        });

        _init();

        function _init() {

        }

        function _getAll() {
            vm.ads = [];
            vm.error = "";

            Ads.getAll(Accounts.active).then(response => {
                if(response.data.length > 0) {
                    vm.ads = response.data;
                } else {
                    vm.error = "No ads found.";
                }
            }, error => {
                vm.error = error.message;
            });
        }
    }
]);