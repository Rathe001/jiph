let modAdSets = angular.module('modAdSets');

modAdSets.controller('ctrlAdSets', ['AdSets', 'Accounts',
    function(AdSets, Accounts) {
        let vm = this;

        vm.adSets = [];

        AdSets.getAll(Accounts.active).then(response => {
            vm.adSets = response.data;
        })
    }
]);