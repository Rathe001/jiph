angular.module('modCommon').factory('Navigation', [
    function() {
        let service = {};
        service.active = "";

        service.all = [
            { name: "Dashboard", icon: "fa-area-chart", url: "", children: [] },
            { name: "Campaigns", icon: "fa-bullhorn", url: "campaigns", children: [
                { name: "Ad Sets", icon: "fa-folder-open-o", url: "ad-sets", children: [
                    { name: "Ads", icon: "fa-image", url: "ads" }
                ] }
            ] },
            { name: "Tracking", icon: "fa-bullseye", url: "tracking", children: [] },
            { name: "Audiences", icon: "fa-users", url: "audiences", children: [] },
            { name: "Ad Groups ", icon: "fa-files-o", url: "ad-groups", children: [] },
            { name: "Automation", icon: "fa-gears", url: "automation", children: [] },
            { name: "Help", icon: "fa-question-circle", url: "help", children: [] }
        ];

        return service;

    }]
);