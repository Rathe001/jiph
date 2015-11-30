var modAudiences = angular.module('modAudiences');

modAudiences.directive('audience', ['Facebook',
    function (Facebook) {
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

            vm.autocompleteLocation = autocompleteLocation;
            vm.hasData = hasData;
            vm.removeLocation = removeLocation;
            vm.removeLocale = removeLocale;

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
                if(newVal && JSON.stringify(newVal) !== "{}")
                    _addLocation();
            });

            // Language/locale change
            $scope.$watch(() => vm.locales.selected, newVal => {
                if(newVal && JSON.stringify(newVal) !== "{}")
                    _addLocale();
            });

            _init();

            function _init() {
                _setDefaults();
                _setAges();
                _getLocales();
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
                    locales: [6]
                };
                vm.locations = {
                    type: "geo_locations",
                    all: [],
                    selected: {}
                };
                vm.locales = {
                    all: [],
                    selected: {}
                }
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
                vm.locales.selected = {};
            }

            function _getLocales() {
                Facebook.get('/search', {
                    q: "",
                    type: 'adlocale',
                    limit: 1000
                }).then(results => {
                    for(let i=0; i<results.data.length; i++) {
                        results.data[i].id = results.data[i].key;
                    }
                    vm.locales.all = results.data;
                });
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

            function removeLocale(l) {
                let index = vm.audience.targeting.locales.indexOf(l);

                if(index > -1) {
                    vm.audience.targeting.locales.splice(index, 1);
                }
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
        }

        function link(scope, elem, attrs) {

        }
    }
]);