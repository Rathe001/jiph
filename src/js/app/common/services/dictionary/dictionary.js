angular.module('modCommon').factory('Dictionary', [
    function() {
        let service = {};

        service.terms = {
            ad_review_feedback: "Ad review feedback",
            adlabels: "Ad labels",
            adset: "Ad set",
            adset_id: "Ad set ID",
            adset_schedule: "Ad set schedule",
            account_id: "Account ID",
            bid_amount: "Bid amount",
            bid_info: "Bid info",
            bid_type: "Bid type",
            billing_event: "Billing event",
            budget_remaining: "Budget remaining",
            buying_type: "buying type",
            campaign: "Campaign",
            campaign_id: "Campaign ID",
            can_use_spend_cap: "Can use spend cap",
            configured_status: "Configured status",
            conversion_specs: "Conversion specs",
            created_time: "Created time",
            creative: "Creative",
            creative_sequence: "Creative sequence",
            daily_budget: "Daily budget",
            effective_status: "Effective status",
            end_time: "End time",
            frequency_cap: "Frequency cap",
            frequency_cap_reset_period: "Frequency cap reset period",
            id: "ID",
            is_autobid: "Is auto bid",
            last_updated_by_app_id: "Last updated by app ID",
            lifetime_budget: "Lifetime budget",
            lifetime_frequency_cap: "Lifetime frequency cap",
            lifetime_imps: "Lifetime impressions",
            name: "Name",
            objective: "Objective",
            optimization_goal: "Optimization goal",
            pacing_type: "Pacing type",
            product_ad_behavior: "Product ad behavior",
            promoted_object: "Promoted object",
            rf_prediction_id: "RF prediction ID",
            rtb_flag: "RTB flag",
            spend_cap: "Spend cap",
            start_time: "Start time",
            stop_time: "Stop time",
            targeting: "Targeting",
            tracking_specs: "Tracking specs",
            updated_time: "Updated time",
            use_new_app_click: "Use new app click"
        };

        return service;
    }]
);