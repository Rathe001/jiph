var modAdSets = angular.module('modAdSets');

modAdSets.directive('budgetSchedule', ['Currency',
    function (Currency) {
        return {
            restrict: 'EA',
            scope: {},
            bindToController: {
                budgetSchedule: '='
            },
            controller: controller,
            link: link,
            controllerAs: "vm",
            replace: true,
            templateUrl: "/js/app/ad-sets/directives/budget-schedule/budget-schedule.html"
        };

        function controller($scope) {
            let vm = this;

            vm.ui = {};

            $scope.$watch(() => vm.ui.budgetType, newVal => {
                if(newVal === "daily") {
                    vm.budgetSchedule.daily_budget = undefined;
                }
                if(newVal === "lifetime") {
                    vm.budgetSchedule.lifetime_budget = undefined;
                }
            });

            _init();

            function _init() {
                _setDefaults();
            }

            function _setDefaults() {
                vm.ui.budgetType = "daily";
                vm.ui.schedule = "infinite";
            }
        }

        function link(scope, elem, attrs) {

        }
    }
]);