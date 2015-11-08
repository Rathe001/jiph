angular.module('modCampaigns').factory('Campaigns', ['$q', 'Loading',
    ($q, Loading) => {
        let service = {};

        service.getAll = getAll;

        return service;

        function getAll(facebookAdAccountId, next, previous) {
            let deferred = $q.defer();
            let payload = {
                date_preset: 'lifetime',
                fields: 'name,id,adlabels,account_id,buying_type,can_use_spend_cap,configured_status,created_time,effective_status,objective,start_time,stop_time,updated_time,spend_cap',
                limit: 5
            };

            if(next) payload.next = next;
            if(next) payload.previous = previous;

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
    }]
);