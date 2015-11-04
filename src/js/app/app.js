(function() {
    var app = angular.module('app', [
        'modCommon'
    ]);

    app.config(['$locationProvider', '$httpProvider', function($locationProvider, $httpProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        // IE AJAX caching fix
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        // Disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    }]);
}());
