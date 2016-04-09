angular.module('modCommon').filter('emptyPlaceholder', function() {
    return function(item) {
        return item ? item : '--';
    };
});
