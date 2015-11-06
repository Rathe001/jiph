angular.module('modCommon').factory('Accounts', ['$window', 'Facebook',
    function($window, Facebook) {
        let service = {};

        service.all = [];
        service.active = "";

        service.getAll = getAll;
        service.setActive = setActive;
        service.getAccountName = getAccountName;

        return service;

        function getAll() {
            return Facebook.get('/me/adaccounts', {fields: 'name,id,owner_business'}).then(results => {
                service.all = results.data;
                console.log(results);
                return results.data;
            });
        }

        function setActive(accountId) {
            if(accountId) {
                service.active = accountId;
                $window.localStorage.setItem("activeAccountId", accountId);
            } else {
                service.active = "";
                $window.localStorage.removeItem("activeAccountId");
            }
        }

        function getAccountName(accountId) {
            if(accountId) {
                if(service.all && service.all.length > 0) {
                    return service.all.find(account => account.id === accountId).name;
                } else {
                    return "No accounts available";
                }
            } else {
                return "No account selected";
            }
        }
    }]
);