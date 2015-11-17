angular.module('modCommon').factory('Api', [
    function() {
        let service = {};

        service.path = "/api/v1/prototype";

        return service;
    }]
);