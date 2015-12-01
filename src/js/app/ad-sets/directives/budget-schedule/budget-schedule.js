var modAdSets = angular.module('modAdSets');

modAdSets.directive('budgetSchedule', [
    function () {
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


        }

        function link(scope, elem, attrs) {

        }
    }
]);