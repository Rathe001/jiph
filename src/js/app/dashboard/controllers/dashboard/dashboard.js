(function() {

    'use strict';

    var modDashboard = angular.module('modDashboard');

    modDashboard.controller('ctrlDashboard', ['Dashboard',
        function(Dashboard) {
            Dashboard.getInsights('act_845503345516804', '1970-01-01', '2015-11-01').then(response => {
                console.log(response);
            })
        }
    ]);
}());
