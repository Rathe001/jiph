let modCampaigns = angular.module('modCampaigns');

modCampaigns.controller('ctrlCampaignsCreate', ['$scope', 'Accounts', 'Campaigns', 'Dictionary', 'Objectives', 'Facebook', 'Audiences',
    function($scope, Accounts, Campaigns, Dictionary, Objectives, Facebook, Audiences) {
        let vm = this;

        vm.objectives = [];
        vm.dictionary = {};
        vm.campaign = {};
        vm.pages = [];
        vm.posts = [];
        vm.pixels = [];
        vm.audiences = [];
        vm.selectedAudience = {};
        vm.ui = {};

        vm.showDetails = showDetails;
        vm.saveAudience = saveAudience;

        _init();

        // Watch objective change
        $scope.$watch(() => vm.campaign.objective, newVal => {
            if(newVal) {
                //console.log(newVal);
            }
        });

        // Watch account change
        $scope.$watch(() => Accounts.active, newVal => {
            if(newVal) {
                _init();
            }
        });

        // Watch page change
        $scope.$watch(() => vm.campaign.promoted_object.page_id, newVal => {
            if(newVal && vm.campaign.objective === "POST_ENGAGEMENT") {
                _getPagePosts();
            }
        });

        // Watch selected audience
        $scope.$watch(() => vm.selectedAudience, newVal => {
            if(newVal && JSON.stringify(newVal) !== "{}") {
                _addAudience(vm.selectedAudience);
            }
        });

        // Watch targeting (deep)
        $scope.$watch(() => vm.audience, newVal => {
            if(newVal && JSON.stringify(newVal) !== "{}") {
                _getReachEstimate(vm.audience);
            }
        }, true);

        function _init(){
            vm.objectives = Objectives.all;
            vm.dictionary = Dictionary;
            vm.campaign = _setDefaultCampaign();
            vm.pages = _getAccountPages();
            vm.pixels = _getAccountPixels();

            _getAudiences();
        }

        function _getAudiences() {
            Audiences.getAll(Accounts.active).then(response => {
                if(response.data.length > 0) {
                    vm.audiences = response.data;
                } else {
                    vm.ui.createAudience = true;
                }
            }, error => {
                vm.error = error.message;
            });
        }

        function _addAudience(id) {
            let add = vm.audiences.find(audience => audience.id === id);

            // Get reach
            let targetingSpec = _generateReachEstimatePayload(add.targeting);

            Facebook.get('/' + Accounts.active + '/reachestimate', targetingSpec)
                .then(response => {
                    add.reach = response.data;
                    vm.campaign.audiences.push(add);
                    vm.selectedAudience = {};
                });
        }

        function _setDefaultCampaign() {
            return {
                name: "",
                audiences: [],
                objective: "",
                buying_type: "AUCTION",
                budget: {},
                promoted_object: {
                    page_id: undefined,
                    application_id: undefined,
                    pixel_id: undefined,
                    custom_event_type: undefined,
                    object_store_url: undefined,
                    offer_id: undefined,
                    product_catalog_id: undefined,
                    product_set_id: undefined
                },
                spend_cap: undefined,
                execution_options: undefined,
                adlabels: undefined
            }
        }

        function _getAccountPages() {
            Facebook.get('/' + Accounts.active + '/connectionobjects').then(connectionobjects => {
                let ary = connectionobjects.data;
                vm.pages = ary.filter(obj => obj.type === 1);
                vm.applications = ary.filter(obj => obj.type === 2);
                vm.events = ary.filter(obj => obj.type === 3);
                vm.places = ary.filter(obj => obj.type === 6);
                vm.domains = ary.filter(obj => obj.type === 7);
            });
        }

        function _getAccountPixels() {
            Facebook.get('/' + Accounts.active + '/offsitepixels').then(offsitepixels => {
                vm.pixels = offsitepixels.data;
            });
        }

        function _getPagePosts() {
            Facebook.get('/' + vm.campaign.promoted_object.page_id + '/promotable_posts', {fields:["full_picture","icon","is_published","link","message","name","object_id","picture","story","type"]}).then(posts => {
                vm.posts = posts.data;
            });
        }

        function _getReachEstimate(audience) {
            let targetingSpec = _generateReachEstimatePayload(audience.targeting);

            vm.reachEstimate = "";
            vm.reachError = "";

            Facebook.get('/' + Accounts.active + '/reachestimate', targetingSpec)
                .then(response => {
                    vm.reachEstimate = response.data.users;
                }, error => {
                    vm.reachError = error.error_user_msg;
                });
        }

        function _generateReachEstimatePayload(input) {
            let output = {
                currency: "USD",
                targeting_spec: {},
                optimize_for: "NONE"
            };

            // Clean out empty values
            for(let i in input) {
                if(_isObject(input[i])) {
                    if(Object.keys(input[i]).length > 0) {
                        output.targeting_spec[i] = angular.copy(input[i]);
                    }
                } else {
                    if(String(input[i])) {
                        output.targeting_spec[i] = angular.copy(input[i]);
                    }
                }
            }

            for(let i in output.targeting_spec) {
                switch(i) {
                    case "genders":
                        output.targeting_spec[i] = [output.targeting_spec[i]];
                        break;
                    case "geo_locations":
                    case "excluded_geo_locations":
                        for(let j in output.targeting_spec[i]) {
                            if(j === "location_types") {
                                output.targeting_spec[i][j] = [output.targeting_spec[i][j]];
                            }
                        }
                        break;
                    case "connections":
                    case "excluded_connections":
                    case "friends_of_connections":
                        if(output.targeting_spec[i]) {
                            let obj = vm.campaign.promoted_object[Object.keys(vm.campaign.promoted_object)[0]];
                            console.log(obj);
                            output.targeting_spec[i] = [obj];
                        } else {
                            output.targeting_spec[i] = undefined;
                        }
                }
            }

            // Strip Angular internals, and convert back to JSON object
            return JSON.parse(angular.toJson(output));

            function _isObject(obj) {
                return obj === Object(obj);
            }
        }

        function showDetails() {
            return !!vm.campaign.objective;
        }

        function saveAudience(audienceId) {
            vm.ui.createAudience = false;
            _getAudiences();
        }
    }
]);