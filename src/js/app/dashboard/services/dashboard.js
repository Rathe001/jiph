(function() {
    'use strict';

    var modDashboard = angular.module('modDashboard');

    modDashboard.factory('Dashboard', ['$q', function($q) {
        let service = {};

        service.getInsights = getInsights;
        service.getAccount = getAccount;

        return service;

        function getInsights(facebookAdAccountId, since, until) {
            let deferred = $q.defer();
            FB.api('/' + facebookAdAccountId + '/insights', {
                fields: 'spend,reach,impressions',
                time_increment: 1,
                level: "account",
                time_range: {
                    since: since,
                    until: until
                },
                default_summary: true
            }, response => {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }

        function getAccount(facebookAdAccountId) {
            let deferred = $q.defer();
            FB.api('/' + facebookAdAccountId, {
                fields: "name,id,owner_business,last_used_time,vertical_name,spend_cap"
            }, response => {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }]);
}());
