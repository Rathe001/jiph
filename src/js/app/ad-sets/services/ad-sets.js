angular.module('modAdSets').factory('AdSets', ['$q', 'Loading',
    ($q, Loading) => {
        let service = {};

        service.getAll = getAll;

        return service;

        function getAll(facebookAdAccountId) {
            let deferred = $q.defer();
            let payload = {
                date_preset: 'lifetime',
                fields: 'name,id,adlabels,adset_schedule,account_id,bid_amount,bid_info,billing_event,campaign,campaign_id,configured_status,created_time,creative_sequence,effective_status,end_time,frequency_cap,frequency_cap_reset_period,is_autobid,lifetime_frequency_cap,lifetime_imps,optimization_goal,product_ad_behavior,promoted_object,rf_prediction_id,rtb_flag,start_time,targeting,updated_time,use_new_app_click,pacing_type,budget_remaining,daily_budget,lifetime_budget',
                limit: 5000
            };

            Loading.set(true, 'facebookrequest');
            FB.api('/' + facebookAdAccountId + '/adsets', payload, response => {
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