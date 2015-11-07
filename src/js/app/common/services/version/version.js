angular.module('modCommon').factory('Version', ['$http',
    function($http) {
        let service = {};

        service.get = get;

        return service;

        function get() {
            return $http.get('/version.json').then(response => response.data);
        }
    }]
);