angular.module('modCommon').factory('User', [
    function() {
        let service = {};

        service.accessToken = "";
        service.userID = "";
        service.name = "";
        service.picture = "";
        service.authenticated = false;


        service.setLogin = setLogin;
        service.setUserInfo = setUserInfo;
        service.clearUserInfo = clearUserInfo;

        return service;

        function setLogin(user) {
            if(user) {

            }
        }

        function setUserInfo(loginInfo, userInfo) {
            service.authenticated = true;

            if(loginInfo) {
                if(loginInfo.accessToken) service.accessToken = loginInfo.accessToken;
                if(loginInfo.userID) service.userID = loginInfo.userID;
            }
            if(userInfo) {
                if(userInfo.name) service.name = userInfo.name;
                if(userInfo.picture && userInfo.picture.data && userInfo.picture.data.url) service.picture = userInfo.picture.data.url;
            }
        }

        function clearUserInfo() {
            service.accessToken = "";
            service.userID = "";
            service.name = "";
            service.picture = "";
            service.authenticated = false;
        }
    }]
);