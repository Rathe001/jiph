let app = angular.module('app', [
    'modTemplates',
    'modAutomation',
    'modCampaigns',
    'modAdSets',
    'modAds',
    'modCommon',
    'modDashboard',
    'modHelp',
    'modAdGroups',
    'modAudiences',
    'modTracking'
]);

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
/* Dashboard */
            // Dashboard
            .when('/', {
                templateUrl: '/js/app/dashboard/controllers/dashboard/dashboard.html',
                controller: 'ctrlDashboard',
                controllerAs: 'vm'
            })
/* Campaigns */
            // Campaigns
            .when('/campaigns', {
                templateUrl: '/js/app/campaigns/controllers/campaigns/campaigns.html',
                controller: 'ctrlCampaigns',
                controllerAs: 'vm'
            })
            // Create
            .when('/campaigns/create', {
                templateUrl: '/js/app/campaigns/controllers/create/create.html',
                controller: 'ctrlCampaignsCreate',
                controllerAs: 'vm'
            })
            // Edit
            .when('/campaigns/:campaignId', {
                templateUrl: '/js/app/campaigns/controllers/edit-create/edit-create.html',
                controller: 'ctrlCampaignsEditCreate',
                controllerAs: 'vm'
            })
            // Ad sets of campaign
            .when('/campaigns/:campaignId/ad-sets', {
                templateUrl: '/js/app/ad-sets/controllers/ad-sets/ad-sets.html',
                controller: 'ctrlAdSets',
                controllerAs: 'vm'
            })
            // Edit ad set
            .when('/ad-sets/:adSetId', {
                templateUrl: '/js/app/ad-sets/controllers/edit-create/edit-create.html',
                controller: 'ctrlAdSetsCreateEdit',
                controllerAs: 'vm'
            })
            // Ads of campaign
            .when('/campaigns/:campaignId/ads', {
                templateUrl: '/js/app/ads/controllers/ads/ads.html',
                controller: 'ctrlAds',
                controllerAs: 'vm'
            })
            // Ads of ad set
            .when('/campaigns/:campaignId/ad-sets/:adSetId/ads', {
                templateUrl: '/js/app/ads/controllers/ads/ads.html',
                controller: 'ctrlAds',
                controllerAs: 'vm'
            })
            // Edit ad
            .when('/ads/:adId', {
                templateUrl: '/js/app/ads/controllers/edit-create/edit-create.html',
                controller: 'ctrlAdsCreateEdit',
                controllerAs: 'vm'
            })
/* Automation */
            .when('/automation', {
                templateUrl: '/js/app/automation/controllers/automation/automation.html',
                controller: 'ctrlAutomation',
                controllerAs: 'vm'
            })
/* Help */
            .when('/help', {
                templateUrl: '/js/app/help/controllers/help/help.html',
                controller: 'ctrlHelp',
                controllerAs: 'vm'
            })
/* Ad groups */
            .when('/ad-groups', {
                templateUrl: '/js/app/ad-groups/controllers/ad-groups/ad-groups.html',
                controller: 'ctrlAdGroups',
                controllerAs: 'vm'
            })
            // Create
            .when('/ad-groups/create', {
                templateUrl: '/js/app/ad-groups/controllers/create-edit/create-edit.html',
                controller: 'ctrlAdGroupsCreateEdit',
                controllerAs: 'vm'
            })
            // Edit
            .when('/ad-groups/:adGroupId', {
                templateUrl: '/js/app/ad-groups/controllers/create-edit/create-edit.html',
                controller: 'ctrlAdGroupsCreateEdit',
                controllerAs: 'vm'
            })
/* Audiences */
            .when('/audiences', {
                templateUrl: '/js/app/audiences/controllers/audiences/audiences.html',
                controller: 'ctrlAudiences',
                controllerAs: 'vm'
            })
            // Create
            .when('/audiences/create', {
                templateUrl: '/js/app/audiences/controllers/create-edit/create-edit.html',
                controller: 'ctrlAudiencesCreateEdit',
                controllerAs: 'vm'
            })
            // Edit
            .when('/audiences/:audienceId', {
                templateUrl: '/js/app/audiences/controllers/create-edit/create-edit.html',
                controller: 'ctrlAudiencesCreateEdit',
                controllerAs: 'vm'
            })
/* Tracking */
            .when('/tracking', {
                templateUrl: '/js/app/tracking/controllers/tracking/tracking.html',
                controller: 'ctrlTracking',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true).hashPrefix('!');
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        // IE AJAX caching fix
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        // Disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    }
]);

app.run(['$window', 'Facebook', 'User', 'Accounts',
    function($window, Facebook, User, Accounts) {
        $window.fbAsyncInit = function() {
            // Executed when the SDK is loaded

            FB.init({
                appId: '444109322439343',
                //appId: '444116655771943',
                status: true,
                cookie: true,
                xfbml: true,
                version: 'v2.5'
            });

            Facebook.getLoginStatus().then(loginInfo => {
                if (loginInfo.status === 'connected') {
                    let accountId = $window.localStorage.getItem("activeAccountId");

                    if(accountId) {
                        Accounts.active = accountId;
                    }

                    Facebook.get('/me', {
                        fields: 'id,name,first_name,last_name,picture'
                    }).then(userInfo => {
                        User.setUserInfo(loginInfo.authResponse, userInfo);
                    });

                    Accounts.getAll(loginInfo.authResponse.userID).then(() => {
                        if(!Accounts.all.find(account => account.id === Accounts.active)) {
                            Accounts.setActive("");
                        }
                    });
                }
            });
        };

        /* Load SDK */
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

    }]);


