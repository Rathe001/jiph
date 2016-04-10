let modCommon = angular.module('modCommon');

modCommon.directive('dropMenu', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            dropMenu: '@'
        },
        link: function(scope, el, attr) {
            let _timerId = null;
            let isOpen = false;

            let onClick = function () {
                clearTimer();
                if(isOpen) {
                    if(scope.dropMenu.indexOf('disable-click-close') === -1) {
                        isOpen = false;
                        el.removeClass("open");
                    }
                } else {
                    isOpen = true;
                    el.addClass("open");
                }

            };

            let onMouseEnter = function () {
                if (isOpen) {
                    clearTimer();
                    cancelAllHover();
                    el.addClass("open");
                }
            };

            let onMouseLeave = function () {
                startTimer();
            };

            let startTimer = function(){
                clearTimer();
                _timerId = $timeout(function(){
                    isOpen = false;
                    el.removeClass("open");
                }, 500);
            };

            let clearTimer = function(){
                if (_timerId !== null) {
                    $timeout.cancel(_timerId);
                    _timerId = null;
                }
            };

            let cancelAllHover = function() {
                $('[drop-menu]').removeClass("open");
            };

            el.bind('click', onClick);
            el.bind('mouseleave', onMouseLeave);
            el.bind('mouseenter', onMouseEnter);
        }
    };
}]);