(function() {
    'use strict';

    var modCommon = angular.module('modCommon');

    modCommon.controller('ctrlMain', ['$scope', '$location', '$window', 'User', 'Facebook', 'Accounts', 'Navigation', 'Loading',
        function($scope, $location, $window, User, Facebook, Accounts, Navigation, Loading) {
            let vm = this;

            vm.user = {};
            vm.accounts = {};
            vm.navigation = {};
            vm.loading = {};

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