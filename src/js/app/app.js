(function() {
    var app = angular.module('app', [
        'modCommon'
    ]);

    app.config(['$locationProvider', '$httpProvider',
        function($locationProvider, $httpProvider) {
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

    app.run(['$window', 'Facebook', 'User',
        function($window, Facebook, User) {
            $window.fbAsyncInit = function() {
                // Executed when the SDK is loaded

                FB.init({
                    appId: '444109322439343',
                    status: true,
                    cookie: true,
                    xfbml: true,
                    version: 'v2.5'
                });

                Facebook.getLoginStatus().then(loginInfo => {
                    if (loginInfo.status === 'connected') {
                        Facebook.getUserInfo().then(userInfo => {
                            User.setUserInfo(loginInfo.authResponse, userInfo);
                        });
                    } else if (response.status === 'not_authorized') {
                        // The person is logged into Facebook, but not your app.

                    } else {
                        // The person is not logged into Facebook, so we're not sure if
                        // they are logged into this app or not.
                        document.getElementById('status').innerHTML = 'Please log ' +
                            'into Facebook.';
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
}());
