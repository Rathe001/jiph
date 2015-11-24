var modAudiences = angular.module('modAudiences');

modAudiences.directive('audience', [function () {
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

    function controller() {
        let vm = this;

    }

    function link(scope, elem, attrs) {

    }
}]);