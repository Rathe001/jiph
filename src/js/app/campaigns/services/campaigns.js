angular.module('modCampaigns').factory('Campaigns', ['$q', '$window', 'Loading',
    ($q, $window, Loading) => {
        let service = {};

        let defaultDataColumns = {
            name: true,
            id: false,
            adlabels: false,
            account_id: false,
            buying_type: true,
            can_use_spend_cap: false,
            configured_status: true,
            created_time: false,
            effective_status: true,
            objective: true,
            start_time: true,
            stop_time: true,
            updated_time: false,
            spend_cap: false
        };

        service.getAll = getAll;
        service.getDataColumns = getDataColumns;
        service.setDataColumns = setDataColumns;

        return service;

        function getAll(facebookAdAccountId) {
            let deferred = $q.defer();
            let payload = {
                date_preset: 'last_7_days',
                fields: 'name,insights,id,adlabels,account_id,buying_type,can_use_spend_cap,configured_status,created_time,effective_status,objective,start_time,stop_time,updated_time,spend_cap',
                limit: 5000
            };

            Loading.set(true, 'facebookrequest');
            FB.api('/' + facebookAdAccountId + '/campaigns', payload, response => {
                if (!response || response.error) {
                    Loading.set(false, 'facebookrequest');
                    deferred.reject(response.error);
                } else {
                    Loading.set(false, 'facebookrequest');
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }

        function getDataColumns() {
            let columns = JSON.parse($window.localStorage.getItem("campaignColumns"));

            if(!columns) columns = defaultDataColumns;

            return columns;
        }

        function setDataColumns(columns) {
            $window.localStorage.setItem("campaignColumns", JSON.stringify(columns));
        }
    }]
);