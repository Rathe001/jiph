(function () {
    'use strict';

    var modCommon = angular.module('modCommon');

    modCommon.directive('dropMenu', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, el, attr) {
                var _timerId = null;
                var isOpen = false;

                var onClick = function () {
                    clearTimer();
                    if(isOpen) {
                        isOpen = false;
                        el.removeClass("open");
                    } else {
                        isOpen = true;
                        el.addClass("open");
                    }

                };

                var onMouseEnter = function () {
                    if (isOpen) {
                        clearTimer();
                        cancelAllHover();
                        el.addClass("open");
                    }
                };

                var onMouseLeave = function () {
                    startTimer();
                };

                var startTimer = function(){
                    clearTimer();
                    _timerId = $timeout(function(){
                        isOpen = false;
                        el.removeClass("open");
                    }, 500);
                };

                var clearTimer = function(){
                    if (_timerId !== null) {
                        $timeout.cancel(_timerId);
                        _timerId = null;
                    }
                };

                var cancelAllHover = function() {
                    $('[drop-menu]').removeClass("open");
                };

                el.bind('click', onClick);
                el.bind('mouseleave', onMouseLeave);
                el.bind('mouseenter', onMouseEnter);
            }
        };
    }]);
}());