angular.module('modCampaigns').factory('Campaigns', ['$q', '$window', 'Loading',
    ($q, $window, Loading) => {
        let service = {};

        let defaultDataColumns = {
            account_id: false,
            actions: false,
            adlabels: false,
            app_store_clicks: false,
            buying_type: false,
            call_to_action_clicks: false,
            can_use_spend_cap: true,
            card_views: false,
            configured_status: false,
            cost_per_action_type: false,
            cost_per_inline_link_click: false,
            cost_per_inline_post_engagement: false,
            cost_per_total_action: false,
            cost_per_unique_action_type: false,
            cost_per_unique_click: false,
            cpm: false,
            cpp: false,
            created_time: false,
            ctr: true,
            date_start: true,
            date_stop: true,
            deeplink_clicks: false,
            effective_status: false,
            estimated_ad_recall_rate: false,
            estimated_ad_recall_rate_lower_bound: false,
            estimated_ad_recall_rate_upper_bound: false,
            frequency: false,
            id: false,
            impressions: true,
            inline_link_clicks: false,
            inline_post_engagement: false,
            objective: false,
            reach: true,
            social_clicks: false,
            social_impressions: false,
            social_reach: false,
            spend: false,
            spend_cap: false,
            start_time: false,
            stop_time: false,
            total_action_value: false,
            total_actions: false,
            total_unique_actions: false,
            unique_actions: false,
            unique_clicks: false,
            unique_ctr: false,
            unique_impressions: false,
            unique_link_clicks_ctr: false,
            unique_social_clicks: false,
            unique_social_impressions: false,
            updated_time: false,
            website_clicks: false,
            website_ctr: false
        };

        service.active = "";

        service.get = get;
        service.getAll = getAll;
        service.getDataColumns = getDataColumns;
        service.setDataColumns = setDataColumns;

        return service;

        function get(campaignId, date_preset) {
            let deferred = $q.defer();
            let payload = {
                fields: 'name,insights.date_preset(' + date_preset +'),id,adlabels,account_id,buying_type,can_use_spend_cap,configured_status,created_time,effective_status,objective,start_time,stop_time,updated_time,spend_cap',
                limit: 5000
            };

            Loading.set(true, 'facebookrequest');
            FB.api('/' + campaignId, payload, response => {
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

        function getAll(facebookAdAccountId, date_preset) {
            let deferred = $q.defer();
            let payload = {
                fields: 'name,insights.date_preset(' + date_preset +'),id,adlabels,account_id,buying_type,can_use_spend_cap,configured_status,created_time,effective_status,objective,start_time,stop_time,updated_time,spend_cap',
                limit: 5000
            };

            Loading.set(true, 'facebookrequest');
            FB.api('/' + facebookAdAccountId + '/campaigns', payload, response => {
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
            let columns = JSON.parse($window.localStorage.getItem("campaignColumns"));

            if(!columns) columns = defaultDataColumns;

            return columns;
        }

        function setDataColumns(columns) {
            $window.localStorage.setItem("campaignColumns", JSON.stringify(columns));
        }
    }]
);