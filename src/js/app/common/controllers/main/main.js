(function() {
    'use strict';

    var modCommon = angular.module('modCommon');

    modCommon.controller('ctrlMain', ['$window', 'User', 'Facebook', 'Accounts',
        function($window, User, Facebook, Accounts) {
            let vm = this;

            vm.user = {};
            vm.accounts = {};

            vm.logout = logout;
            vm.login = login;

            _init();

            function _init() {
                vm.user = User;
                vm.accounts = Accounts;
            }

            function logout() {
                Facebook.logout().then(() => {
                    User.clearUserInfo();
                });
            }

            function login() {
                Facebook.login().then(loginInfo => {
                    Facebook.getUserInfo().then(userInfo => {
                        User.setUserInfo(loginInfo.authResponse, userInfo);
                    });

                    Accounts.getAll(loginInfo.authResponse.userID);
                });
            }
        }]);
}());
