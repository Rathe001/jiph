(function() {
    'use strict';

    var modCommon = angular.module('modCommon');

    modCommon.controller('ctrlMain', ['$window', 'User',
        function($window, User) {
            let vm = this;

            vm.user = User;

            vm.loaded = true;

            _init();

            function _init() {

            }
        }]);
}());
