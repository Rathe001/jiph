angular.module('modCommon').factory('DateIntervals', ['$window', 'Facebook',
    function($window, Facebook) {
        let service = {};

        service.intervals = [
            'today',
            'yesterday',
            'last_3_days',
            'this_week',
            'last_week',
            'last_7_days',
            'last_14_days',
            'last_28_days',
            'last_30_days',
            'last_90_days',
            'this_month',
            'last_month',
            'this_quarter',
            'last_3_months',
            'lifetime'
        ];

        service.getSelected = getSelected;
        service.setSelected = setSelected;

        return service;

        function getSelected() {
            let interval = $window.localStorage.getItem("dateInterval");

            if(!interval) interval = "last_7_days";

            return interval;
        }

        function setSelected(interval) {
            $window.localStorage.setItem("dateInterval", interval);
        }
    }]
);