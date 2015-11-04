(function() {
    'use strict';

    var modCommon = angular.module('modCommon');

    modCommon.controller('ctrlMain', [
        function() {
            let vm = this;

            vm.loggedIn = false;
        }]);
}());
