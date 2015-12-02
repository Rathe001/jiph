angular.module('modAdSets').factory('OptimizationGoals', [
    () => {
        let service = {};

        // Do not change position in array
        const goals = [
            {id: "APP_INSTALLS", name: "App installs"}, // 0
            {id: "ENGAGED_USERS", name: "Engaged users"}, // 1
            {id: "EVENT_RESPONSES", name: "Event responses"}, // 2
            {id: "IMPRESSIONS", name: "Impressions"}, // 3
            {id: "LINK_CLICKS", name: "Link clicks"}, // 4
            {id: "OFFER_CLAIMS", name: "Offer claims"}, // 5
            {id: "OFFSITE_CONVERSIONS", name: "Offsite conversions"}, // 6
            {id: "PAGE_ENGAGEMENT", name: "Page engagement"}, // 7
            {id: "PAGE_LIKES", name: "Page likes"}, // 8
            {id: "POST_ENGAGEMENT", name: "Post engagement"}, // 9
            {id: "REACH", name: "Reach"}, // 10
            {id: "SOCIAL_IMPRESSIONS", name: "Social impressions"}, // 11
            {id: "VIDEO_VIEWS", name: "Video views"} // 12
        ];

        service.getAllValid = getAllValid;
        service.getDefault = getDefault;

        return service;

        function getAllValid(objective) {
            let output = [];

            switch(objective) {
                case "CANVAS_APP_ENGAGEMENT":
                    // ENGAGED_USERS, APP_INSTALLS, IMPRESSIONS, POST_ENGAGEMENT, REACH
                    output.push(goals[1]); output.push(goals[0]); output.push(goals[3]); output.push(goals[7]); output.push(goals[10]);
                    break;
                case "CANVAS_APP_INSTALLS":
                    // APP_INSTALLS, IMPRESSIONS, POST_ENGAGEMENT
                    output.push(goals[0]); output.push(goals[3]); output.push(goals[9]);
                    break;
                case "CONVERSIONS":
                    // OFFSITE_CONVERSIONS, IMPRESSIONS, LINK_CLICKS, POST_ENGAGEMENT, REACH, SOCIAL_IMPRESSIONS
                    output.push(goals[6]); output.push(goals[3]); output.push(goals[4]); output.push(goals[7]); output.push(goals[10]); output.push(goals[11]);
                    break;
                case "EVENT_RESPONSES":
                    // EVENT_RESPONSES, IMPRESSIONS, REACH
                    output.push(goals[2]); output.push(goals[3]); output.push(goals[10]);
                    break;
                case "LINK_CLICKS":
                    // LINK_CLICKS, IMPRESSIONS, PAGE_ENGAGEMENT, POST_ENGAGEMENT, REACH
                    output.push(goals[4]); output.push(goals[3]); output.push(goals[7]); output.push(goals[2]); output.push(goals[10]);
                    break;
                case "LOCAL_AWARENESS":
                    // REACH
                    output.push(goals[10]);
                    break;
                case "MOBILE_APP_ENGAGEMENT":
                    // LINK_CLICKS, IMPRESSIONS, REACH, OFFSITE_CONVERSIONS
                    output.push(goals[4]); output.push(goals[3]); output.push(goals[10]); output.push(goals[6]);
                    break;
                case "MOBILE_APP_INSTALLS":
                    // APP_INSTALLS, LINK_CLICKS, IMPRESSIONS, REACH
                    output.push(goals[0]); output.push(goals[4]); output.push(goals[3]); output.push(goals[10]);
                    break;
                case "OFFER_CLAIMS":
                    // OFFER_CLAIMS, IMPRESSIONS, POST_ENGAGEMENT
                    output.push(goals[5]); output.push(goals[3]); output.push(goals[9]);
                    break;
                case "PAGE_LIKES":
                    // PAGE_LIKES, IMPRESSIONS, PAGE_ENGAGEMENT, POST_ENGAGEMENT, REACH
                    output.push(goals[8]); output.push(goals[3]); output.push(goals[7]); output.push(goals[9]); output.push(goals[10]);
                    break;
                case "POST_ENGAGEMENT":
                    // POST_ENGAGEMENT, IMPRESSIONS, LINK_CLICKS, PAGE_ENGAGEMENT, REACH, VIDEO_VIEWS
                    output.push(goals[9]); output.push(goals[3]); output.push(goals[4]); output.push(goals[7]); output.push(goals[10]); output.push(goals[12]);
                    break;
                case "PRODUCT_CATALOG_SALES":
                    // LINK_CLICKS, IMPRESSIONS, POST_ENGAGEMENT, REACH
                    output.push(goals[4]); output.push(goals[3]); output.push(goals[9]); output.push(goals[10]);
                    break;
                case "VIDEO_VIEWS":
                    // VIDEO_VIEWS, REACH
                    output.push(goals[12]); output.push(goals[10]);
                    break;
            }

            return output;
        }

        function getDefault(objective) {
            switch(objective) {
                case "CANVAS_APP_ENGAGEMENT": return goals[1];
                case "CANVAS_APP_INSTALLS": return goals[0];
                case "CONVERSIONS": return goals[6];
                case "EVENT_RESPONSES": return goals[2];
                case "LINK_CLICKS": return goals[4];
                case "LOCAL_AWARENESS": return goals[10];
                case "MOBILE_APP_ENGAGEMENT": return goals[4];
                case "MOBILE_APP_INSTALLS": return goals[0];
                case "OFFER_CLAIMS": return goals[5];
                case "PAGE_LIKES": return goals[8];
                case "POST_ENGAGEMENT": return goals[9];
                case "PRODUCT_CATALOG_SALES": return goals[4];
                case "VIDEO_VIEWS": return goals[12];
            }
        }
    }]
);