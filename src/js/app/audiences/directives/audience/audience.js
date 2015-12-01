var modAudiences = angular.module('modAudiences');

modAudiences.directive('audience', ['Facebook', 'Accounts', 'Audiences',
    function (Facebook, Accounts, Audiences) {
        return {
            restrict: 'EA',
            scope: {},
            bindToController: {
                audience: '=',
                onSave: '='
            },
            controller: controller,
            link: link,
            controllerAs: "vm",
            replace: true,
            templateUrl: "/js/app/audiences/directives/audience/audience.html"
        };

        function controller($scope) {
            let vm = this;

            let saveLock = false;

            vm.ages = [];
            vm.audience = {};
            vm.locations = {};
            vm.locales = {};
            vm.categories = {};
            vm.demographics = {};
            vm.behaviors = {};
            vm.interests = {};
            vm.education_schools = {};
            vm.education_statuses = {};
            vm.college_years = {};
            vm.education_majors = {};
            vm.work_employers = {};
            vm.work_positions = {};
            vm.connections = {};

            vm.autocompleteLocation = autocompleteLocation;
            vm.autocompleteEducationSchool = autocompleteEducationSchool;
            vm.autocompleteEducationMajor = autocompleteEducationMajor;
            vm.autocompleteWorkEmployer = autocompleteWorkEmployer;
            vm.autocompleteWorkPosition = autocompleteWorkPosition;
            vm.hasData = hasData;
            vm.removeLocation = removeLocation;
            vm.removeDemographic = removeDemographic;
            vm.saveAudience = saveAudience;

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

            // Education schools change
            $scope.$watch(() => vm.education_schools.selected, newVal => {
                if(newVal && JSON.stringify(newVal) !== "{}") {
                    _addDemographic('education_schools');
                }
            });

            // Education status change
            $scope.$watch(() => vm.education_statuses.selected, newVal => {
                if(newVal && JSON.stringify(newVal) !== "{}") {
                    _addDemographic('education_statuses');
                }
            });

            // Education status change
            $scope.$watch(() => vm.college_years.selected, newVal => {
                if(newVal && JSON.stringify(newVal) !== "{}") {
                    _addDemographic('college_years');
                }
            });

            // Education major change
            $scope.$watch(() => vm.education_majors.selected, newVal => {
                if(newVal && JSON.stringify(newVal) !== "{}") {
                    _addDemographic('education_majors');
                }
            });

            // Work employer change
            $scope.$watch(() => vm.work_employers.selected, newVal => {
                if(newVal && JSON.stringify(newVal) !== "{}") {
                    _addDemographic('work_employers');
                }
            });

            // Work employer change
            $scope.$watch(() => vm.work_positions.selected, newVal => {
                if(newVal && JSON.stringify(newVal) !== "{}") {
                    _addDemographic('work_positions');
                }
            });

            // BCT change
            $scope.$watch(() => vm.categories.selected, newVal => {
                if(newVal && JSON.stringify(newVal) !== "{}") {
                    _addBCT();
                }
            });

            // Connections change
            $scope.$watch(() => vm.connections.selected, newVal => {
                if(newVal && JSON.stringify(newVal) !== "{}") {
                    _addConnection();
                }
            });

            _init();

            function _init() {
                _setDefaults();
                _setAges();
                _setConnectionOptions();
                _getLocales();
                _getDemographics();
                _getCategories();
                _getBehaviors();
                _getInterests();
                _getEducationStatuses();
                _getCollegeYears();
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
                        countries: ['US']
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
                vm.education_schools = {
                    all: [],
                    selected: {}
                };
                vm.education_statuses = {
                    all: [],
                    selected: {}
                };
                vm.college_years = {
                    all: [],
                    selected: {}
                };
                vm.education_majors = {
                    all: [],
                    selected: {}
                };
                vm.work_employers = {
                    all: [],
                    selected: {}
                };
                vm.work_positions = {
                    all: [],
                    selected: {}
                };
            }

            function _setConnectionOptions() {
                vm.connections.all = [
                    {id: "include", name: "Connections", desc: "People who are a fan of your Page, a member of your group, RSVP’d to your event or have authorized your app. "},
                    {id: "exclude", name: "Excluded connections", desc: "People who have not become fans of your page, members of your group, RSVP'd to your event or authorized your app."},
                    {id: "friends", name: "Friends of connections", desc: "Friends of the people who are connected to your object."}
                ];
            }

            function _addConnection() {
                vm.audience.targeting.connections = false;
                vm.audience.targeting.excluded_connections = false;
                vm.audience.targeting.friends_of_connections = false;

                if(vm.connections.selected.id === "include") vm.audience.targeting.connections = true;
                if(vm.connections.selected.id === "exclude") vm.audience.targeting.excluded_connections = true;
                if(vm.connections.selected.id === "friends") vm.audience.targeting.friends_of_connections = true;
            }

            function _addLocation() {
                let type = vm.locations.selected.type;
                let item = {};

                if(type === "country") type = "countries";
                if(type === "region") type = "regions";
                if(type === "city") type = "cities";
                if(type === "zip") type = "zips";
                if(type === "custom_location") type = "custom_locations";
                if(type === "geo_market") type = "geo_markets";

                switch(type) {
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

            function _addDemographic(type) {
                if(!type) {
                    type = vm.demographics.selected.type;
                    if(!vm.audience.targeting[type]) vm.audience.targeting[type] = [];

                    if(!vm.audience.targeting[type].find(item => item.id === vm.demographics.selected.id)) {
                        vm.audience.targeting[type].push({
                            id: vm.demographics.selected.id,
                            name: vm.demographics.selected.name
                        });
                    }
                } else {
                    if(!vm.audience.targeting[type]) vm.audience.targeting[type] = [];

                    if(!vm.audience.targeting[type].find(item => item.id === vm[type].selected.id)) {
                        vm.audience.targeting[type].push({
                            id: vm[type].selected.id,
                            name: vm[type].selected.name
                        });
                    }
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

            function _getCollegeYears() {
                for(let i=1980; i<2019; i++) {
                    vm.college_years.all.push({name:i, id:i});
                }
            }

            function _getEducationStatuses() {
                vm.education_statuses.all = [
                    {id: 1, name: "High school"},
                    {id: 2, name: "Undergrad"},
                    {id: 3, name: "Alum"},
                    {id: 4, name: "High school grad"},
                    {id: 5, name: "Some college"},
                    {id: 6, name: "Associate degree"},
                    {id: 7, name: "In grad school"},
                    {id: 8, name: "Some grad school"},
                    {id: 9, name: "Master degree"},
                    {id: 10, name: "Professional degree"},
                    {id: 11, name: "Doctorate degree"},
                    {id: 12, name: "Unspecified"},
                    {id: 13, name: "Some high school"}
                ]
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

            function autocompleteEducationSchool(searchString) {
                Facebook.get('/search', {
                    q: searchString,
                    type: 'adeducationschool',
                    limit: 10
                }).then(results => {
                    vm.education_schools.all = results.data;
                });
            }

            function autocompleteEducationMajor(searchString) {
                Facebook.get('/search', {
                    q: searchString,
                    type: 'adeducationmajor',
                    limit: 10
                }).then(results => {
                    vm.education_majors.all = results.data;
                });
            }

            function autocompleteWorkEmployer(searchString) {
                Facebook.get('/search', {
                    q: searchString,
                    type: 'adworkemployer',
                    limit: 10
                }).then(results => {
                    vm.work_employers.all = results.data;
                });
            }

            function autocompleteWorkPosition(searchString) {
                Facebook.get('/search', {
                    q: searchString,
                    type: 'adworkposition',
                    limit: 10
                }).then(results => {
                    vm.work_positions.all = results.data;
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

            function saveAudience() {
                if(!saveLock) {
                    saveLock = true;
                    vm.audience.id = 123;
                    Audiences.remove().then(deleted => {
                        Audiences.create([vm.audience]).then(response => {
                            saveLock = false;

                            if(vm.onSave) {
                                vm.onSave("Testing!");
                            }
                        });
                    });
                }
            }
        }

        function link(scope, elem, attrs) {

        }
    }
]);