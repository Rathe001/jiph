let app = angular.module('app', [
    'modTemplates',
    'modAutomation',
    'modCampaigns',
    'modAdSets',
    'modAds',
    'modCommon',
    'modDashboard',
    'modHelp',
    'modPresetAdGroups',
    'modPresetAudiences',
    'modTracking'
]);

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.
        when('/', {
            templateUrl: '/js/app/dashboard/controllers/dashboard/dashboard.html',
            controller: 'ctrlDashboard',
            controllerAs: 'vm'
        }).
        when('/ad-sets', {
            templateUrl: '/js/app/ad-sets/controllers/ad-sets/ad-sets.html',
            controller: 'ctrlAdSets',
            controllerAs: 'vm'
        }).
        when('/ads', {
            templateUrl: '/js/app/ads/controllers/ads/ads.html',
            controller: 'ctrlAds',
            controllerAs: 'vm'
        }).
        when('/automation', {
            templateUrl: '/js/app/automation/controllers/automation/automation.html',
            controller: 'ctrlAutomation',
            controllerAs: 'vm'
        }).
        when('/campaigns', {
            templateUrl: '/js/app/campaigns/controllers/campaigns/campaigns.html',
            controller: 'ctrlCampaigns',
            controllerAs: 'vm'
        }).
        when('/help', {
            templateUrl: '/js/app/help/controllers/help/help.html',
            controller: 'ctrlHelp',
            controllerAs: 'vm'
        }).
        when('/preset-ad-groups', {
            templateUrl: '/js/app/preset-ad-groups/controllers/preset-ad-groups/preset-ad-groups.html',
            controller: 'ctrlPresetAdGroups',
            controllerAs: 'vm'
        }).
        when('/preset-audiences', {
            templateUrl: '/js/app/preset-audiences/controllers/preset-audiences/preset-audiences.html',
            controller: 'ctrlPresetAudiences',
            controllerAs: 'vm'
        }).
        when('/tracking', {
            templateUrl: '/js/app/tracking/controllers/tracking/tracking.html',
            controller: 'ctrlTracking',
            controllerAs: 'vm'
        }).
        otherwise({
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