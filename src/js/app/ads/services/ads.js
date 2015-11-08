angular.module('modAds').factory('Ads', ['$q', 'Loading',
    ($q, Loading) => {
        let service = {};

        service.getAll = getAll;

        return service;

        function getAll(facebookAdAccountId) {
            let deferred = $q.defer();
            let payload = {
                date_preset: 'lifetime',
                fields: 'id,name,account_id,adset{id,name},campaign{id,name},adlabels,adset_id,bid_amount,bid_info,bid_type,configured_status,conversion_specs,created_time,creative,effective_status,last_updated_by_app_id,tracking_specs,updated_time,campaign_id,ad_review_feedback',
                limit: 5000
            };

            Loading.set(true, 'facebookrequest');
            FB.api('/' + facebookAdAccountId + '/ads', payload, response => {
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