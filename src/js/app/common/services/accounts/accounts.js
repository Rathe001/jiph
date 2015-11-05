angular.module('modCommon').factory('Accounts', ['Facebook',
    function(Facebook) {
        let service = {};

        service.all = [];
        service.active = "";

        service.getAll = getAll;
        service.setActive = setActive;
        service.getAccountName = getAccountName;

        return service;

        function getAll(userId) {
            return Facebook.getUserAccounts(userId).then(results => {
                service.all = results.data;
                return results.data;
            });
        }

        function setActive(accountId) {
            if(accountId) {
                service.active = accountId;
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