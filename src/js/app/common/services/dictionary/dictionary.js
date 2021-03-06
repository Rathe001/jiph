angular.module('modCommon').factory('Dictionary', [
    function() {
        let service = {};

        service.terms = {
            ad_review_feedback: "Ad review feedback",
            adlabels: "Ad labels",
            ads: "Ads",
            adset: "Ad set",
            adsets: "Ad sets",
            adset_id: "Ad set ID",
            adset_schedule: "Ad set schedule",
            account_id: "Account ID",
            bid_amount: "Bid amount",
            bid_info: "Bid info",
            bid_type: "Bid type",
            billing_event: "Billing event",
            budget_remaining: "Budget remaining",
            buying_type: "Buying type",
            campaign: "Campaign",
            campaigns: "Campaigns",
            campaign_id: "Campaign ID",
            can_use_spend_cap: "Can use spend cap",
            configured_status: "Configured status",
            conversion_specs: "Conversion specs",
            create_ad: "Create Ad",
            create_ad_set: "Create Ad Set",
            create_campaign: "New Campaign",
            create_ad_group: "New Ad Group",
            create_audience: "New Audience",
            created_time: "Created time",
            creative: "Creative",
            creative_sequence: "Creative sequence",
            customize_columns: "Customize Columns",
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
            use_new_app_click: "Use new app click",
            actions: "Actions",
            app_store_clicks: "App store clicks",
            call_to_action_clicks: "Call to action clicks",
            card_views: "Card views",
            cost_per_action_type: "Cost per action type",
            cost_per_inline_link_click: "Cost per inline link click",
            cost_per_inline_post_engagement: "Cost per inline post engagement",
            cost_per_total_action: "Cost per total action",
            cost_per_unique_action_type: "Cost per unique action type",
            cost_per_unique_click: "Cost per unique click",
            cpm: "CPM",
            cpp: "CPP",
            ctr: "CTR",
            date_start: "Date start",
            date_stop: "Date stop",
            deeplink_clicks: "Deep link clicks",
            estimated_ad_recall_rate: "Estimated ad recall rate",
            estimated_ad_recall_rate_lower_bound: "Estimated ad recall rate lower bound",
            estimated_ad_recall_rate_upper_bound: "Estimated ad recall rate upper bound",
            frequency: "Frequency",
            impressions: "Impressions",
            inline_link_clicks: "Inline link clicks",
            inline_post_engagement: "Inline post engagement",
            reach: "Reach",
            social_clicks: "Social clicks",
            social_impressions: "Social impressions",
            social_reach: "Social reach",
            spend: "Spend",
            total_action_value: "Total action value",
            total_actions: "Total actions",
            total_unique_actions: "Total unique actions",
            unique_actions: "Unique actions",
            unique_clicks: "Unique clicks",
            unique_ctr: "Unique CTR",
            unique_impressions: "Unique impressions",
            unique_link_clicks_ctr: "Unique link clicks CTR",
            unique_social_clicks: "Unique social clicks",
            unique_social_impressions: "Unique social impressions",
            website_clicks: "Website clicks",
            website_ctr: "Website CTR"
        };

        service.objectives = {
            CANVAS_APP_ENGAGEMENT: "Canvas app engagement",
            CANVAS_APP_INSTALLS: "Canvas app installs",
            CONVERSIONS: "Conversions",
            EVENT_RESPONSES: "Event responses",
            EXTERNAL: "External",
            LEAD_GENERATION: "Lead generation",
            LINK_CLICKS: "Link clicks",
            LOCAL_AWARENESS: "Local awareness",
            MOBILE_APP_ENGAGEMENT: "Mobile app engagement",
            MOBILE_APP_INSTALLS: "Mobile app installs",
            OFFER_CLAIMS: "Offer claims",
            PAGE_LIKES: "Page likes",
            POST_ENGAGEMENT: "Post engagement",
            PRODUCT_CATALOG_SALES: "Product catalog sales",
            VIDEO_VIEWS: "Video views"
        };

        service.statuses = {
            ACTIVE: "Active",
            PAUSED: "Paused",
            ARCHIVED: "Archived",
            DELETED: "Deleted",
            CAMPAIGN_PAUSED: "Campaign paused",
            ADSET_PAUSED: "Ad set paused",
            PENDING_REVIEW: "Pending review",
            DISAPPROVED: "Disapproved",
            PREAPPROVED: "Preapproved",
            PENDING_BILLING_INFO: "Pending billing info"
        };

        service.buyingTypes = {
            AUCTION: "Auction",
            RESERVED: "Reserved"
        };

        service.billingEvents = {
            APP_INSTALLS: "App installs",
            CLICKS: "Clicks",
            IMPRESSIONS: "Impressions",
            LINK_CLICKS: "Link clicks",
            OFFER_CLAIMS: "Offer claims",
            PAGE_LIKES: "Page likes",
            POST_ENGAGEMENT: "Post engagement",
            VIDEO_VIEWS: "Video views"
        };

        service.optimizationGoals = {
            NONE: "None",
            APP_INSTALLS: "App installs",
            BRAND_AWARENESS: "Brand awareness",
            CLICKS: "Clicks",
            ENGAGED_USERS: "Engaged users",
            EXTERNAL: "External",
            EVENT_RESPONSES: "Event responses",
            IMPRESSIONS: "Impressions",
            LINK_CLICKS: "Link clicks",
            OFFER_CLAIMS: "Offer claims",
            OFFSITE_CONVERSIONS: "Offsite conversions",
            PAGE_ENGAGEMENT: "Page engagement",
            PAGE_LIKES: "Page likes",
            POST_ENGAGEMENT: "Post engagement",
            REACH: "Reach",
            SOCIAL_IMPRESSIONS: "Social impressions",
            VIDEO_VIEWS: "Video views"
        };

        service.productAdBehaviors = {
            REQUIRE_LAST_SEEN_PRODUCTS: "Require last seen products",
            REQUIRE_AVAILABLE_LAST_SEEN_PRODUCTS: "Require available last seen products",
            FALL_BACK_TO_FB_RECOMMENDATIONS: "Fall back to Facebook recommendations"
        };

        service.bidInfoActions = {
            ACTIONS: "Actions",
            CLICKS: "Clicks",
            REACH: "Reach"
        };

        service.dateIntervals = {
            today: "Today",
            yesterday: "Yesterday",
            last_3_days: "Last 3 days",
            this_week: "This week",
            last_week: "Last week",
            last_7_days: "Last 7 days",
            last_14_days: "Last 14 days",
            last_28_days: "Last 28 days",
            last_30_days: "Last 30 days",
            last_90_days: "Last 90 days",
            this_month: "This month",
            last_month: "Last month",
            this_quarter: "This quarter",
            last_3_months: "Last 3 months",
            lifetime: "Lifetime"
        };

        service.adGroups = {
            ad_groups: "Ad groups"
        };

        service.audiences = {
            audiences: "Audiences"
        };

        return service;
    }]
);