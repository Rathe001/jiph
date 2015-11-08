let modAds = angular.module('modAds');

modAds.controller('ctrlAds', ['Ads', 'Accounts',
    function(Ads, Accounts) {
        let vm = this;

        vm.ads = [];

        Ads.getAll(Accounts.active).then(response => {
            vm.ads = response.data;
        })
    }
]);