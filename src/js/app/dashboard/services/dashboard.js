(function() {
    'use strict';

    var modDashboard = angular.module('modDashboard');

    modDashboard.factory('Dashboard', ['$q', 'Loading', function($q, Loading) {
        let service = {};

        service.generateReport = generateReport;
        service.checkReportStatus = checkReportStatus;
        service.fetchAsyncReport = fetchAsyncReport;

        return service;

        function generateReport(facebookAdAccountId, since, until) {
            let deferred = $q.defer();
            Loading.set(true, 'facebookrequest');
            FB.api('/' + facebookAdAccountId + '/insights', 'post', {
                time_increment: 1,
                level: 'campaign',
                time_range: {
                    since: since,
                    until: until
                },
                fields: 'spend,impressions,reach',
                default_summary: true
            }, response => {
                if (!response || response.error) {
                    Loading.set(false, 'facebookrequest');
                    deferred.reject('Error occured');
                } else {
                    Loading.set(false, 'facebookrequest');
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }

        function checkReportStatus(asyncReportId) {
            // Loading is handled in controller due to timeout delay
            let deferred = $q.defer();
            FB.api('/' + asyncReportId, response => {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }

        function fetchAsyncReport(asyncReportId) {
            Loading.set(true, 'facebookrequest');
            let deferred = $q.defer();
            FB.api('/' + asyncReportId + '/insights', response => {
                if (!response || response.error) {
                    Loading.set(false, 'facebookrequest');
                    deferred.reject('Error occured');
                } else {
                    Loading.set(false, 'facebookrequest');
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }]);
}());
