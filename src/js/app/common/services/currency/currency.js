angular.module('modCommon').factory('Currency', ['Accounts',
    function(Accounts) {
        let service = {};

        service.to = to;
        service.from = from;

        return service;

        function to(val) {
            return isNaN(val / Accounts.getCurrencyOffset()) ? null : val / Accounts.getCurrencyOffset();
        }

        function from(val) {
            return isNaN(val * Accounts.getCurrencyOffset()) ? null : val * Accounts.getCurrencyOffset();
        }
    }]
);