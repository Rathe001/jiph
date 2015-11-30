var modAudiences = angular.module('modAudiences');

modAudiences.directive('audience', ['Facebook', 'Accounts',
    function (Facebook, Accounts) {
        return {
            restrict: 'EA',
            scope: {},
            bindToController: {
                audience: '='
            },
            controller: controller,
            link: link,
            controllerAs: "vm",
            replace: true,
            templateUrl: "/js/app/audiences/directives/audience/audience.html"
        };

        function controller($scope) {
            let vm = this;

            vm.ages = [];
            vm.audience = {};
            vm.locations = {};
            vm.locales = {};
            vm.categories = {};
            vm.demographics = {};
            vm.behaviors = {};
            vm.interests = {};

            vm.autocompleteLocation = autocompleteLocation;
            vm.hasData = hasData;
            vm.removeLocation = removeLocation;
            vm.removeDemographic = removeDemographic;

            // Validate ages
            $scope.$watch(() => vm.audience.targeting.age_min + vm.audience.targeting.age_max, () => {
                if(vm.audience && vm.audience.targeting.age_min && vm.audience && vm.audience.targeting.age_max) {
                    if(vm.audience.targeting.age_max < vm.audience.targeting.age_min) {
                        vm.audience.targeting.age_min = vm.audience.targeting.age_max;
                    }
                }
            });

            // Location change
            $scope.$watch(() => vm.locations.selected, newVal => {
                if(newVal && JSON.stringify(newVal) !== "{}") {
                    _addLocation();
                }
            });

            // Language/locale change
            $scope.$watch(() => vm.locales.selected, newVal => {
                if(newVal && JSON.stringify(newVal) !== "{}") {
                    _addLocale();
                }
            });

            // Behaviors change
            $scope.$watch(() => vm.behaviors.selected, newVal => {
                if(newVal && JSON.stringify(newVal) !== "{}") {
                    _addBehavior();
                }
            });

            // Interests change
            $scope.$watch(() => vm.interests.selected, newVal => {
                if(newVal && JSON.stringify(newVal) !== "{}") {
                    _addInterest();
                }
            });

            // Demographics change
            $scope.$watch(() => vm.demographics.selected, newVal => {
                if(newVal && JSON.stringify(newVal) !== "{}") {
                    _addDemographic();
                }
            });

            // BCT change
            $scope.$watch(() => vm.categories.selected, newVal => {
                if(newVal && JSON.stringify(newVal) !== "{}") {
                    _addBCT();
                }
            });

            _init();

            function _init() {
                _setDefaults();
                _setAges();
                _getLocales();
                _getDemographics();
                _getCategories();
                _getBehaviors();
                _getInterests();
            }

            function _setAges() {
                for(let i=13; i<66; i++) {
                    let item = {id: i, name: String(i)};
                    if(i===65) item.name = "65+";
                    vm.ages.push(item);
                }
            }

            function _setDefaults() {
                vm.audience.targeting = {
                    age_min: 13,
                    age_max: 65,
                    geo_locations: {
                        country: [{key: 'US'}]
                    },
                    excluded_geo_locations: {},
                    genders: "",
                    locales: [6],
                    behaviors: [],
                    interests: [],
                    user_adclusters: []

                };
                vm.locations = {
                    type: "geo_locations",
                    all: [],
                    selected: {}
                };
                vm.locales = {
                    all: [],
                    selected: {}
                };
                vm.categories = {
                    all: [],
                    selected: {}
                };
                vm.demographics = {
                    all: [],
                    selected: {}
                };
                vm.behaviors = {
                    all: [],
                    selected: {}
                };
                vm.interests = {
                    all: [],
                    selected: {}
                };
            }

            function _addLocation() {
                let type = vm.locations.selected.type;
                let item = {};

                switch(vm.locations.selected.type) {
                    case "countries":
                        item = vm.locations.selected.key;
                        break;
                    case "cities":
                        item = {key: vm.locations.selected.key, radius:12, distance_unit: "mile"};
                        break;
                    case "custom_locations":
                        item = {};
                        break;
                    case "geo_markets":
                        item = {key: vm.locations.selected.key, name: vm.locations.selected.name};
                        break;
                    default:
                        item = {key: vm.locations.selected.key};
                }

                if(!vm.audience.targeting[vm.locations.type][type]) vm.audience.targeting[vm.locations.type][type] = [];
                vm.audience.targeting[vm.locations.type][type].push(item);
            }

            function _addLocale() {
                if(vm.audience.targeting.locales.indexOf(vm.locales.selected) === -1) {
                    vm.audience.targeting.locales.push(vm.locales.selected);
                }
            }

            function _addDemographic() {
                let type = vm.demographics.selected.type;

                if(!vm.audience.targeting[type]) vm.audience.targeting[type] = [];

                if(!vm.audience.targeting[type].find(item => item.id === vm.demographics.selected.id)) {
                    vm.audience.targeting[type].push({
                        id: vm.demographics.selected.id,
                        name: vm.demographics.selected.name
                    });
                }
            }

            function _addBehavior() {
                if(!vm.audience.targeting.behaviors.find(item => item.id === vm.behaviors.selected.id)) {
                    vm.audience.targeting.behaviors.push({
                        id: vm.behaviors.selected.id,
                        name: vm.behaviors.selected.name
                    });
                }
            }

            function _addInterest() {
                if(!vm.audience.targeting.interests.find(item => item.id === vm.interests.selected.id)) {
                    vm.audience.targeting.interests.push({
                        id: vm.interests.selected.id,
                        name: vm.interests.selected.name
                    });
                }
            }

            function _addBCT() {
                if(!vm.audience.targeting.user_adclusters.find(item => item.id === vm.categories.selected.id)) {
                    vm.audience.targeting.user_adclusters.push({
                        id: vm.categories.selected.id,
                        name: vm.categories.selected.name
                    });
                }
            }

            function _getCategories() {
                Facebook.get('/' + Accounts.active + '/broadtargetingcategories').then(results => {
                    vm.categories.all = results.data;
                });
            }

            function _getLocales() {
                Facebook.get('/search', {
                    q: "",
                    limit: "500",
                    locale: "en_US",
                    type: "adlocale"
                }).then(results => {
                    for(let i=0; i<results.data.length; i++) {
                        results.data[i].id = results.data[i].key;
                    }
                    vm.locales.all = results.data;
                });
            }

            function _getDemographics() {
                Facebook.get('/search', {
                    class: "demographics",
                    limit: "500",
                    locale: "en_US",
                    type: "adTargetingCategory"
                }).then(results => {
                    vm.demographics.all = _generateTree(results.data);
                });
            }

            function _getBehaviors() {
                Facebook.get('/search', {
                    class: "behaviors",
                    locale: "en_US",
                    type: "adTargetingCategory"
                }).then(results => {
                    vm.behaviors.all = _generateTree(results.data);
                });
            }

            function _getInterests() {
                Facebook.get('/search', {
                    locale: "en_US",
                    type: "adInterestCategory"
                }).then(results => {
                    vm.interests.all = _generateTree(results.data);
                });
            }

            function _generateTree(data) {
                // TODO: generate data trees
                return data;
            }

            function autocompleteLocation(searchString) {
                Facebook.get('/search', {
                    q: searchString,
                    type: 'adgeolocation',
                    limit: 10
                }).then(results => {
                    for(let i=0; i<results.data.length; i++){
                        results.data[i].id = results.data[i].key;
                    }
                    vm.locations.all = results.data;
                });
            }

            function hasData(item) {
                if(Object.keys(item).length === 1 && Object.keys(item)[0] === "location_types") {
                    return false;
                }

                return Object.keys(item).length > 0;
            }

            function removeLocation(l, inclusionType, type) {
                let index = vm.audience.targeting[inclusionType][type].indexOf(l);

                if(index > -1) {
                    vm.audience.targeting[inclusionType][type].splice(index, 1);
                }

                if(vm.audience.targeting[inclusionType][type].length === 0) {
                    delete vm.audience.targeting[inclusionType][type];
                }
            }

            function removeDemographic(index, demographic) {
                vm.audience.targeting[demographic].splice(index, 1);
            }
        }

        function link(scope, elem, attrs) {

        }
    }
]);