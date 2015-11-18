var modCommon = angular.module('modCommon');

modCommon.directive('debug', [function () {
    return {
        restrict: 'EA',
        scope: {},
        bindToController: {
            debug: '=',
            title: '@debug'
        },
        controller: () => {},
        controllerAs: "vm",
        replace: true,
        template: `
            <div class="debug">
                <div class="btn btn-default pull-left" ng-click="vm.isDebugging = !vm.isDebugging">Debug {{vm.title}}</div>
                <pre ng-show="vm.isDebugging">{{vm.debug | json}}</pre>
            </div>
        `
    };
}]);