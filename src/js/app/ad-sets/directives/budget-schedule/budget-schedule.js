var modAdSets = angular.module('modAdSets');

modAdSets.directive('budgetSchedule', ['Currency', 'OptimizationGoals', 'BillingEvents',
    function (Currency, OptimizationGoals, BillingEvents) {
        return {
            restrict: 'EA',
            scope: {},
            bindToController: {
                budgetSchedule: '=',
                objective: '@'
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
            vm.optimizationGoals = [];

            // Budget type change
            $scope.$watch(() => vm.ui.budgetType, newVal => {
                vm.budgetSchedule.daily_budget = 0;
                vm.budgetSchedule.lifetime_budget = 0;
                vm.ui.dailySchedule = false;
            });

            // Campaign objective change
            $scope.$watch(() => vm.objective, newVal => {
                if(newVal) {
                    _setDefaults();
                }
            });

            // Autobid change
            $scope.$watch(() => vm.budgetSchedule.is_autobid, newVal => {
                vm.budgetSchedule.bid_amount = 0;
                vm.budgetSchedule.pacing_type = "standard";
            });

            // Optimization goal change
            $scope.$watch(() => vm.budgetSchedule.optimization_goal, newVal => {
                if(newVal) {
                    _setBillingEvents();
                }
            });

            _init();

            function _init() {
                _setDefaults();
            }

            function _setDefaults() {
                vm.ui = {
                    budgetType: "daily",
                    schedule: "infinite",
                    dailySchedule: false
                };

                vm.optimizationGoals = OptimizationGoals.getAllValid(vm.objective);

                vm.budgetSchedule = {
                    lifetime_budget: 0,
                    daily_budget: 0,
                    is_autobid: true,
                    bid_amount: 0,
                    pacing_type: "standard",
                    optimization_goal: OptimizationGoals.getDefault(vm.objective).id,
                    billing_event: ""
                }
            }

            function _setBillingEvents() {
                vm.billingEvents = BillingEvents.getAllValid(vm.budgetSchedule.optimization_goal);
                vm.budgetSchedule.billing_event = BillingEvents.getDefault(vm.budgetSchedule.optimization_goal).id;
            }
        }

        function link(scope, elem, attrs) {

        }
    }
]);