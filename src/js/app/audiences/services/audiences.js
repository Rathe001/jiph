angular.module('modAudiences').factory('Audiences', ['$http', '$q', '$window', 'Loading', 'Api',
    ($http, $q, $window, Loading, Api) => {
        let service = {};

        service.getAll = getAll;
        service.create = create;
        service.update = update;
        service.remove = remove;

        return service;

        function create(payload) {
            let url = Api.path + "/audiences";

            Loading.set(true, url);
            return $http.post(url, payload).then(
                success => {
                    Loading.set(false, url);
                    return success;
                },
                error => {
                    Loading.set(false, url);
                    return $q.reject(error);
                });
        }

        function getAll(facebookAdAccountId) {
            let url = Api.path + "/audiences";

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

        function update(payload) {
            let url = Api.path + "/audiences";

            Loading.set(true, url);
            return $http.put(url, payload).then(
                success => {
                    Loading.set(false, url);
                    return success;
                },
                error => {
                    Loading.set(false, url);
                    return $q.reject(error);
                });
        }

        function remove() {
            let url = Api.path + "/audiences";

            Loading.set(true, url);
            return $http.delete(url).then(
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