angular.module('modCommon').factory('Accounts', ['$window', 'Facebook',
    function($window, Facebook) {
        let service = {};

        service.all = [];
        service.active = "";

        service.getAll = getAll;
        service.setActive = setActive;
        service.getActive = getActive;
        service.getAccountName = getAccountName;
        service.getCurrencyOffset = getCurrencyOffset;

        return service;

        function getAll() {
            return Facebook.get('/me/adaccounts', {fields: 'name,id,owner_business,currency,amount_spent,spend_cap'}).then(results => {
                service.all = results.data;
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

        function getActive() {
            if(service.all.length > 0 && service.active) {
                return service.all.find(account => account.id === service.active);
            } else {
                return {};
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

        function getCurrencyOffset() {
            let c = service.getActive().currency;

            if(c === "CLP" || c === "COP" || c === "CRC" || c === "HUF" || c === "ISK" || c === "IDR" || c === "JPY" || c === "KRW" || c === "PYG" || c === "TWD" || c ===  "VND") {
                return 1;
            } else {
                return 100;
            }
        }
    }]
);