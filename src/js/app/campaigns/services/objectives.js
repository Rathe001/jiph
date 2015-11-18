angular.module('modCampaigns').factory('Objectives', [
    () => {
        let service = {};

        service.all = [
            {
                id: "CANVAS_APP_ENGAGEMENT",
                name: "",
                shortDesc: "",
                longDesc: "",
                icon: "",
                enabled: false
            },
            {
                id: "CANVAS_APP_INSTALLS",
                name: "",
                shortDesc: "",
                longDesc: "",
                icon: "",
                enabled: false
            },
            {
                id: "CONVERSIONS",
                name: "Website Conversions",
                shortDesc: "Send people to your website to take a specific action, like signing up for a newsletter. Use a pixel to measure your conversions.",
                longDesc: "Use the 'website conversions' objective to promote conversions on your website.",
                icon: "fa-globe",
                enabled: true
            },
            {
                id: "EVENT_RESPONSES",
                name: "Event Responses",
                shortDesc: "Promote your Facebook event to increase your attendance.",
                longDesc: "Use the 'event responses' objective to get more people to see and respond to your event.",
                icon: "fa-calendar-check-o",
                enabled: true
            },
            {
                id: "EXTERNAL",
                name: "",
                shortDesc: "",
                longDesc: "",
                icon: "",
                enabled: false
            },
            {
                id: "LEAD_GENERATION",
                name: "",
                shortDesc: "",
                longDesc: "",
                icon: "",
                enabled: false
            },
            {
                id: "LINK_CLICKS",
                name: "Clicks to Website",
                shortDesc: "Increase the number of visits to your website.",
                longDesc: "Use the 'clicks to website' objective to send people to your website.",
                icon: "fa-mouse-pointer",
                enabled: true
            },
            {
                id: "LOCAL_AWARENESS",
                name: "Local Awareness",
                shortDesc: "Promote your business to people who are nearby.",
                longDesc: "Use the 'local awareness' objective to reach people near your business.",
                icon: "fa-map-marker",
                enabled: true
            },
            {
                id: "MOBILE_APP_ENGAGEMENT",
                name: "App Engagement",
                shortDesc: "Get more people to use your Facebook or mobile app.",
                longDesc: "Use the 'app engagement' objective to increase engagement in your app.",
                icon: "fa-gamepad",
                enabled: true
            },
            {
                id: "MOBILE_APP_INSTALLS",
                name: "App Installs",
                shortDesc: "Send people to the store where they can purchase your app.",
                longDesc: "Use the 'app installs' objective to get people to install your app.",
                icon: "fa-cube",
                enabled: true
            },
            {
                id: "OFFER_CLAIMS",
                name: "Offer Claims",
                shortDesc: "Promote timely discounts or other deals for people to claim in your store.",
                longDesc: "Use the 'offer claims' objective to promote your offer.",
                icon: "fa-money",
                enabled: true
            },
            {
                id: "PAGE_LIKES",
                name: "Page Likes",
                shortDesc: "Connect more people with your page.",
                longDesc: "Use the 'page likes' objective to promote your Facebook page.",
                icon: "fa-thumbs-o-up",
                enabled: true
            },
            {
                id: "POST_ENGAGEMENT",
                name: "Page Post Engagement",
                shortDesc: "Get more people to see and engage with your Page posts.",
                longDesc: "Use the 'page post engagement' objective to boost your post.",
                icon: "fa-comment",
                enabled: true
            },
            {
                id: "PRODUCT_CATALOG_SALES",
                name: "",
                shortDesc: "",
                longDesc: "",
                icon: "",
                enabled: false
            },
            {
                id: "VIDEO_VIEWS",
                name: "Video Views",
                shortDesc: "Promote videos that show behind-the-scenes footage, product launches or customer stories to raise awareness about your brand.",
                longDesc: "Use the 'video views' objective to get people to watch your video.",
                icon: "fa-video-camera",
                enabled: true
            }
        ];

        return service;
    }]
);