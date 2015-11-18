let modCampaigns = angular.module('modCampaigns');

modCampaigns.controller('ctrlCampaignsCreate', ['Campaigns', 'Dictionary', 'Objectives',
    function(Campaigns, Dictionary, Objectives) {
        let vm = this;

        vm.objectives = [];
        vm.dictionary = {};
        vm.campaign = {};

        vm.showDetails = showDetails;

        _init();

        function _init(){
            vm.objectives = Objectives.all;
            vm.dictionary = Dictionary;
            vm.campaign = _setDefaultCampaign();
        }

        function _setDefaultCampaign() {
            return {
                name: "",
                objective: "",
                buying_type: "AUCTION",
                promoted_object: {},
                spend_cap: null,
                execution_options: "VALIDATE_ONLY",
                adlabels: {}
            }
        }

        function showDetails() {
            return !!vm.campaign.objective;
        }
    }
]);