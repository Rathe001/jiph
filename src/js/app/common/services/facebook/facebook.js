angular.module('modCommon').factory('Facebook', ['$q',
    function($q) {
        let service = {};

        service.login = login;
        service.logout = logout;
        service.getUserInfo = getUserInfo;
        service.getUserAccounts = getUserAccounts;
        service.getLoginStatus = getLoginStatus;

        return service;

        function login() {
            var deferred = $q.defer();
            FB.login(response => {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();
            FB.logout(response => {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }

        function getUserInfo() {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: 'id,name,first_name,last_name,picture'
            }, response => {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }

        function getUserAccounts(userId) {
            var deferred = $q.defer();
            FB.api('/' + userId + '/accounts', response => {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }

        function getLoginStatus() {
            var deferred = $q.defer();
            FB.getLoginStatus(response => {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }]
);