let modCampaigns = angular.module('modCampaigns');

modCampaigns.controller('ctrlCampaigns', ['Campaigns', 'Accounts',
    function(Campaigns, Accounts) {
        let vm = this;

        vm.campaigns = [];

        Campaigns.getAll(Accounts.active).then(response => {
            vm.campaigns = response.data;
        })
    }
]);