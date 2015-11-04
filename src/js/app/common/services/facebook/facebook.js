angular.module('modCommon').factory('Facebook', ['$q',
    function($q) {
        let service = {};

        service.getUserInfo = getUserInfo;
        service.getLoginStatus = getLoginStatus;

        return service;

        function getUserInfo() {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: 'id,name,picture'
            }, function(response) {
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