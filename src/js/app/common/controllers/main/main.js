(function() {
    'use strict';

    var modCommon = angular.module('modCommon');

    modCommon.controller('ctrlMain', ['$scope', '$location', '$window', 'User', 'Facebook', 'Accounts', 'Navigation',
        function($scope, $location, $window, User, Facebook, Accounts, Navigation) {
            let vm = this;

            vm.user = {};
            vm.accounts = {};
            vm.navigation = {};

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

                    Facebook.getUserInfo().then(userInfo => {
                        User.setUserInfo(loginInfo.authResponse, userInfo);
                    });

                    Accounts.getAll(loginInfo.authResponse.userID);
                });
            }
        }]);
}());