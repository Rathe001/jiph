angular.module('modCommon').factory('Loading', [
    function() {
        var service = {};
        service.status = true;
        service.queue = 0;
        service.endpoints = {};

        service.set = function(boolean, url) {
            let aryUrl = url.split('?')[0].split("/");
            let aryUrlCopy = angular.copy(aryUrl);

            // Clean the URL
            aryUrlCopy = aryUrl.filter(item => item.length <= 30 && item.indexOf("act_") === -1 && isNaN(item));

            let dataEndpoint = aryUrlCopy.join("");

            // Ignore html template requests
            if(dataEndpoint.indexOf(".html") !== -1) {
                return;
            }
            // Do not add these endpoints to the loading queue
            if(dataEndpoint === "apiusersfeed") return;

            // Set defaults if we've never seen this before
            if (!angular.isDefined(service.endpoints[dataEndpoint])) service.endpoints[dataEndpoint] = {};
            if (isNaN(service.endpoints[dataEndpoint].queue)) service.endpoints[dataEndpoint].queue = 0;
            if (typeof service.endpoints[dataEndpoint].status !== 'boolean') service.endpoints[dataEndpoint].status = true;

            // Modify loading queue
            if (boolean === true) {
                //console.log(dataEndpoint);
                service.endpoints[dataEndpoint].queue++;
                service.queue++;
            } else {
                service.endpoints[dataEndpoint].queue--;
                service.queue--;
            }

            // Endpoint specific loading
            service.endpoints[dataEndpoint].status = (service.endpoints[dataEndpoint].queue > 0);
            // Total loading
            service.status = service.queue > 0;
        };

        service.get = function(file) {
            if (file !== 'All') {
                if (angular.isDefined(service.endpoints[file])) {
                    return service.endpoints[file].status;
                } else {
                    return false;
                }
            } else {
                return service.status;
            }
        };

        return service;
    }
]);
