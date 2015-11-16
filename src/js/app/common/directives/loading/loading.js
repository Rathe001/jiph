var modCommon = angular.module('modCommon');

modCommon.directive('loading', [function () {
    return {
        restrict: 'A',
        templateUrl: '/js/app/common/directives/loading/loading.html',
        replace: true,
        scope: {
            loading: '='
        }
    };
}]);