angular.module('modAdSets').factory('BillingEvents', [
    () => {
        let service = {};

        // Do not change position in array
        const events = [
            {id: "IMPRESSIONS", name: "Impressions"}, // 0
            {id: "APP_INSTALLS", name: "App installs"}, // 1
            {id: "LINK_CLICKS", name: "Link clicks"}, // 2
            {id: "OFFER_CLAIMS", name: "Offer claims"}, // 3
            {id: "PAGE_LIKES", name: "Page likes"}, // 4
            {id: "POST_ENGAGEMENT", name: "Post engagement"}, // 5
            {id: "VIDEO_VIEWS", name: "Video views"} // 6
        ];

        service.getAllValid = getAllValid;
        service.getDefault = getDefault;

        return service;

        function getAllValid(goal) {
            let output = [];

            output.push(events[0]);

            switch(goal) {
                case "APP_INSTALLS": output.push(events[1]); break;
                case "LINK_CLICKS": output.push(events[2]); break;
                case "OFFER_CLAIMS": output.push(events[3]); break;
                case "PAGE_LIKES": output.push(events[4]); break;
                case "POST_ENGAGEMENT": output.push(events[5]); break;
                case "VIDEO_VIEWS": output.push(events[6]); break;
            }

            return output;
        }

        function getDefault(goal) {
            switch(goal) {
                case "APP_INSTALLS": return events[1];
                case "LINK_CLICKS": return events[2];
                case "OFFER_CLAIMS": return events[3];
                case "PAGE_LIKES": return events[4];
                case "POST_ENGAGEMENT": return events[5];
                case "VIDEO_VIEWS": return events[6];
                default: return events[0];
            }
        }
    }]
);