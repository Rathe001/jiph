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

            vm.autocompleteLocation = autocompleteLocation;

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

            _init();

            function _init() {
                _setAges();
                _setDefaults();
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
                    geo_locations: {},
                    excluded_geo_locations: {},
                    genders: "[1,2]"
                };
                vm.locations = {
                    type: "geo_locations",
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
        }

        function link(scope, elem, attrs) {

        }
    }
]);