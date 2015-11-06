angular.module('modCommon').factory('EstimateTimeToCompletion', [
    function() {
        let service = {};

        service.get = get;

        return service;

        function get(startTime, currentTime, percentageComplete) {
            let elapsedTime = currentTime - startTime;
            let estimated = (elapsedTime / percentageComplete) * 100;

            if(isNaN(estimated) || estimated === 0 || estimated === Infinity) estimated = 2;

            return ((estimated - elapsedTime) * 1000) / 2 < 2000 ? 2000 : ((estimated - elapsedTime) * 1000) / 2;
        }
    }]
);