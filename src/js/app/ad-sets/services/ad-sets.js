angular.module('modAdSets').factory('AdSets', ['$q', '$window', 'Loading',
    ($q, $window, Loading) => {
        let service = {};
        
        let defaultDataColumns = {
            name: true,
            id: false,
            adlabels: false,
            adset_schedule: false,
            account_id: false,
            bid_amount: true,
            bid_info: true,
            billing_event: true,
            campaign: false,
            campaign_id: false,
            configured_status: false,
            created_time: false,
            creative_sequence: false,
            effective_status: true,
            end_time: true,
            frequency_cap: false,
            frequency_cap_reset_period: false,
            is_autobid: true,
            lifetime_frequency_cap: false,
            lifetime_imps: false,
            optimization_goal: true,
            product_ad_behavior: false,
            promoted_object: false,
            rf_prediction_id: false,
            rtb_flag: false,
            start_time: true,
            targeting: false,
            updated_time: false,
            use_new_app_click: false,
            pacing_type: false,
            budget_remaining: true,
            daily_budget: true,
            lifetime_budget: true
        };

        service.getAll = getAll;
        service.getDataColumns = getDataColumns;
        service.setDataColumns = setDataColumns;

        return service;

        function getAll(facebookAdAccountId) {
            let deferred = $q.defer();
            let payload = {
                date_preset: 'last_7_days',
                fields: 'name,id,insights,adlabels,adset_schedule,account_id,bid_amount,bid_info,billing_event,campaign{id,name},campaign_id,configured_status,created_time,creative_sequence,effective_status,end_time,frequency_cap,frequency_cap_reset_period,is_autobid,lifetime_frequency_cap,lifetime_imps,optimization_goal,product_ad_behavior,promoted_object,rf_prediction_id,rtb_flag,start_time,targeting,updated_time,use_new_app_click,pacing_type,budget_remaining,daily_budget,lifetime_budget',
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

        function getDataColumns() {
            let columns = JSON.parse($window.localStorage.getItem("adSetColumns"));

            if(!columns) columns = defaultDataColumns;

            return columns;
        }

        function setDataColumns(columns) {
            $window.localStorage.setItem("adSetColumns", JSON.stringify(columns));
        }
    }]
);