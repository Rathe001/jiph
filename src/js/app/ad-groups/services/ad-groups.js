angular.module('modAdGroups').factory('AdGroups', ['$q', '$window', 'Loading',
    ($q, $window, Loading) => {
        let service = {};

        service.getAll = getAll;

        return service;

        function getAll(facebookAdAccountId) {
            let deferred = $q.defer();
            let url = "/api/prototype/adGroups";

            Loading.set(true, url);
            FB.api(url, payload, response => {
                if (!response || response.error) {
                    Loading.set(false, url);
                    deferred.reject(response.error);
                } else {
                    Loading.set(false, url);
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }]
);