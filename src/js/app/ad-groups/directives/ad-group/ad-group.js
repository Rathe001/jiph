var modAdGroups = angular.module('modAdGroups');

modAdGroups.directive('adGroup', [
    function () {
        return {
            restrict: 'EA',
            scope: {},
            bindToController: {
                adGroup: '=',
                objective: '@'
            },
            controller: controller,
            link: link,
            controllerAs: "vm",
            replace: true,
            templateUrl: "/js/app/ad-groups/directives/ad-group/ad-group.html"
        };

        function controller($scope) {
            let vm = this;

        }

        function link(scope, elem, attrs) {

        }
    }
]);