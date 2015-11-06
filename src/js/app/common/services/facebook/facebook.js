angular.module('modCommon').factory('Facebook', ['$q', 'Loading',
    function($q, Loading) {
        let service = {};

        service.get = get;
        service.login = login;
        service.logout = logout;
        service.getLoginStatus = getLoginStatus;

        return service;

        function get(url, params) {
            let deferred = $q.defer();
            Loading.set(true, 'facebookrequest');
            FB.api(url, params, response => {
                if (!response || response.error) {
                    Loading.set(false, 'facebookrequest');
                    deferred.reject(response.error);
                } else {
                    Loading.set(false, 'facebookrequest');
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }

        function login() {
            let deferred = $q.defer();
            Loading.set(true, 'facebookrequest');
            FB.login(response => {
                if (!response || response.error) {
                    Loading.set(false, 'facebookrequest');
                    deferred.reject(response.error);
                } else {
                    Loading.set(false, 'facebookrequest');
                    deferred.resolve(response);
                }
            }, {
                scope: 'publish_actions,manage_pages,email,public_profile,publish_pages,user_friends,ads_read,ads_management'
            });
            return deferred.promise;
        }

        function logout() {
            let deferred = $q.defer();
            Loading.set(true, 'facebookrequest');
            FB.logout(response => {
                if (!response || response.error) {
                    Loading.set(false, 'facebookrequest');
                    deferred.reject(response.error);
                } else {
                    Loading.set(false, 'facebookrequest');
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }

        function getLoginStatus() {
            let deferred = $q.defer();
            Loading.set(true, 'facebookrequest');
            FB.getLoginStatus(response => {
                if (!response || response.error) {
                    Loading.set(false, 'facebookrequest');
                    deferred.reject(response.error);
                } else {
                    Loading.set(false, 'facebookrequest');
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }]
);