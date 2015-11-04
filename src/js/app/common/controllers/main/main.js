(function() {
    'use strict';

    var modCommon = angular.module('modCommon');

    modCommon.controller('ctrlMain', ['$window', 'User', 'Facebook',
        function($window, User, Facebook) {
            let vm = this;

            vm.user = {};

            vm.logout = logout;
            vm.login = login;

            _init();

            function _init() {
                vm.user = User;
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
                });
            }
        }]);
}());
