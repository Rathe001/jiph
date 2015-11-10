angular.module('modAds').factory('Ads', ['$q', '$window', 'Loading',
    ($q, $window, Loading) => {
        let service = {};

        let defaultDataColumns = {
            id: false,
            name: true,
            account_id: false,
            adset: false,
            campaign: false,
            adlabels: false,
            adset_id: false,
            bid_amount: true,
            bid_info: true,
            bid_type: true,
            configured_status: true,
            conversion_specs: false,
            created_time: false,
            creative: false,
            effective_status: true,
            last_updated_by_app_id: false,
            tracking_specs: false,
            updated_time: false,
            campaign_id: false,
            ad_review_feedback: false
        };

        service.getAll = getAll;
        service.getDataColumns = getDataColumns;
        service.setDataColumns = setDataColumns;

        return service;

        function getAll(facebookAdAccountId, date_preset, campaignId, adSetId) {
            let deferred = $q.defer();
            let url = "";
            let payload = {
                fields: 'id,name,insights.date_preset(' + date_preset +'),account_id,adset{id,name},campaign{id,name},adlabels,adset_id,bid_amount,bid_info,bid_type,configured_status,conversion_specs,created_time,creative,effective_status,last_updated_by_app_id,tracking_specs,updated_time,campaign_id,ad_review_feedback',
                limit: 5000
            };

            if(campaignId) url = '/' + campaignId + '/ads';
            if(adSetId) url = '/' + adSetId + '/ads';

            Loading.set(true, 'facebookrequest');
            FB.api(url, payload, response => {
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

        function getDataColumns() {
            let columns = JSON.parse($window.localStorage.getItem("adColumns"));

            if(!columns) columns = defaultDataColumns;

            return columns;
        }

        function setDataColumns(columns) {
            $window.localStorage.setItem("adColumns", JSON.stringify(columns));
        }
    }]
);