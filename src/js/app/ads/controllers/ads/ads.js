let modAds = angular.module('modAds');

modAds.controller('ctrlAds', ['$scope', 'Ads', 'Accounts',
    function($scope, Ads, Accounts) {
        let vm = this;

        vm.ads = [];

        $scope.$watch(() => Accounts.active, newVal => {
            if(newVal){
                _getAll();
            }
        });

        _init();

        function _init() {

        }

        function _getAll() {
            Ads.getAll(Accounts.active).then(response => {
                vm.ads = response.data;
            })
        }
    }
]);