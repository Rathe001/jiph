var modAdGroups = angular.module('modAdGroups', ['modCommon']);

modAdGroups.controller('ctrlAdGroups', ['$scope', 'Accounts', 'Dictionary', 'AdGroups',
    function($scope, Accounts, Dictionary, AdGroups) {
        let vm = this;

        vm.adGroups = [];
        vm.dictionary = {};
        vm.orderBy = "";
        vm.error = "";

        vm.toggleOrderBy = toggleOrderBy;

        $scope.$watch(() => Accounts.active, newVal => {
            if(newVal){
                _getAll();
            }
        });

        _init();

        function _init() {
            vm.dictionary = Dictionary;
        }

        function _getAll() {
            vm.adGroups = [];
            vm.error = "";
/*
            AdGroups.getAll(Accounts.active).then(response => {
                if(response.data.length > 0) {
                    vm.adGroups = _processResponse(response.data);
                } else {
                    vm.error = "No ad sets found.";
                }
            }, error => {
                vm.error = error.message;
            });
            */
        }

        function _processResponse(input) {
            let output = input;

            return output;
        }

        function toggleOrderBy(col) {
            if(vm.orderBy === col) {
                if(col[0] === "-") {
                    vm.orderBy.replace("-", "");
                } else {
                    vm.orderBy = "-" + col;
                }
            } else {
                vm.orderBy = col;
            }
        }
    }
]);