let modAudiences = angular.module('modAudiences', ['modCommon']);

modAudiences.controller('ctrlAudiences', ['$scope', 'Accounts', 'Dictionary', 'Audiences',
    function($scope, Accounts, Dictionary, Audiences) {
        let vm = this;

        vm.audiences = [];
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
            vm.audiences = [];
            vm.error = "";
            /*
             Audiences.getAll(Accounts.active).then(response => {
                 if(response.data.length > 0) {
                    vm.audiences = _processResponse(response.data);
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