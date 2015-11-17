angular.module('modAdGroups').factory('AdGroups', ['$http', '$q', '$window', 'Loading', 'Api',
    ($http, $q, $window, Loading, Api) => {
        let service = {};

        service.getAll = getAll;

        return service;

        function getAll(facebookAdAccountId) {
            let url = Api.path + "/adGroups";

            Loading.set(true, url);
            return $http.get(url).then(
                success => {
                    Loading.set(false, url);
                    return success;
                },
                error => {
                    Loading.set(false, url);
                    return $q.reject(error);
                });
        }
    }]
);