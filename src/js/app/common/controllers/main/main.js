(function() {
    'use strict';

    var modCommon = angular.module('modCommon');

    modCommon.controller('ctrlMain', ['$scope', '$interval', '$location', '$window', 'User', 'Facebook', 'Accounts', 'Navigation', 'Loading', 'Version',
        function($scope, $interval, $location, $window, User, Facebook, Accounts, Navigation, Loading, Version) {
            let vm = this;

            vm.user = {};
            vm.accounts = {};
            vm.navigation = {};
            vm.loading = {};
            vm.version = "";
            vm.year = "";

            vm.logout = logout;
            vm.login = login;

            $scope.$on('$locationChangeStart', function(event) {
                Navigation.active = $location.path();
            });

            _init();

            function _init() {
                vm.user = User;
                vm.accounts = Accounts;
                vm.navigation = Navigation;
                vm.loading = Loading;

                vm.year = new Date().getFullYear();
                Version.get().then(v => vm.version = v.version);

                let versionCheck = $interval(() => {
                    Version.get().then(v => {
                        if(vm.version !== v.version) {
                            if($window.confirm("A newer version of the Jiph application is available. Please click \"OK\" to refresh the application.")) {
                                console.log("Hit!");
                                $window.location.href = "/";
                            }
                        }
                    });
                }, 20000);

            }

            function logout() {
                Facebook.logout().then(() => {
                    User.clearUserInfo();
                });
            }

            function login() {
                Facebook.login().then(loginInfo => {
                    let accountId = $window.localStorage.getItem("activeAccountId");

                    if(accountId) {
                        Accounts.active = accountId;
                    }

                    Facebook.get('/me', {fields: 'id,name,first_name,last_name,picture'}).then(userInfo => {
                        User.setUserInfo(loginInfo.authResponse, userInfo);
                    });

                    Accounts.getAll(loginInfo.authResponse.userID).then(() => {
                        if(!Accounts.all.find(account => account.id === Accounts.active)) {
                            Accounts.setActive("");
                        }
                    });
                });
            }
        }]);
}());