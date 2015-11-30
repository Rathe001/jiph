var modCommon = angular.module('modCommon');

modCommon.directive('comboBox', [function () {
    return {
        restrict: 'EA',
        scope: {},
        bindToController: {
            comboBox: '=',
            bind: '=',
            autocomplete: '=',
            type: '@',
            placeholder: '@',
            clearOnSelect: '='
        },
        controller: controller,
        link: link,
        controllerAs: "vm",
        replace: true,
        template: `
            <div>
                <div class="click-catcher" ng-click="vm.toggleMenu()" ng-if="vm.showMenu"></div>
                <div class="combo-box" ng-switch="vm.type">
                    <div class="wrapper" ng-class="{'loading': !vm.comboBox}">
                        <input type="text" ng-model="vm.filter" ng-click="vm.toggleMenu()" placeholder="{{vm.placeholder}}" />
                    </div>
                    <div class="drop-menu" ng-if="vm.showMenu" ng-switch-when="connectionobjects">
                        <ul>
                            <li ng-repeat="c in vm.comboBox | filter:vm.filter" ng-click="vm.select(c)">
                            <img ng-src="{{c.picture}}" ng-alt="{{c.name}}" />
                                <div class="pad-content">
                                    {{c.name}}<br />
                                    <small ng-if="c.website">{{c.website}}</small>
                                    <small ng-if="!c.website">{{c.url}}</small>
                                </div>
                            </li>
                            <li ng-if="vm.comboBox.length === 0">No data found.</li>
                        </ul>
                    </div>
                    <div class="drop-menu" ng-if="vm.showMenu" ng-switch-when="pixels">
                        <ul>
                            <li ng-repeat="c in vm.comboBox | filter:vm.filter" ng-click="vm.select(c)">
                                {{c.name}}<br />
                                <small>ID: {{c.id}} &nbsp;&nbsp;&nbsp; Category: {{c.tag}}</small>
                            </li>
                            <li ng-if="vm.comboBox.length === 0">No data found.</li>
                        </ul>
                    </div>
                    <div class="drop-menu" ng-if="vm.showMenu" ng-switch-when="locations">
                        <ul>
                            <li ng-repeat="c in vm.comboBox" ng-click="vm.selectObject(c)">
                                {{c.name}} <small>{{c.type}}</small>
                            </li>
                            <li ng-if="vm.comboBox.length === 0">No data found.</li>
                        </ul>
                    </div>
                    <div class="drop-menu" ng-if="vm.showMenu" ng-switch-when="targeting">
                        <ul>
                            <li ng-repeat="c in vm.comboBox | filter:vm.filter" ng-click="vm.selectObject(c)">
                                {{c.name}} <small>{{c.type}}</small>
                            </li>
                            <li ng-if="vm.comboBox.length === 0">No data found.</li>
                        </ul>
                    </div>
                    <div class="drop-menu" ng-if="vm.showMenu" ng-switch-default>
                        <ul>
                            <li ng-repeat="c in vm.comboBox | filter:vm.filter" ng-click="vm.select(c)">{{c.name}}</li>
                            <li ng-if="vm.comboBox.length === 0">No data found.</li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    };

    function controller($scope) {
        let vm = this;

        vm.showMenu = false;

        vm.select = select;
        vm.selectObject = selectObject;
        vm.toggleMenu = toggleMenu;

        $scope.$watch(() => vm.filter, (newVal, oldVal) => {
            if(vm.autocomplete && vm.filter && vm.filter !== "" && newVal !== oldVal && newVal.length > 0) {
                vm.autocomplete(vm.filter);
            }
        });

        function select(c) {
            vm.bind = c.id;
            if(vm.clearOnSelect) {
                vm.bindName = "";
            } else {
                vm.bindName = c.name;
            }
            vm.filter = vm.bindName;
            toggleMenu();
        }

        function selectObject(c) {
            vm.bind = c;
            if(vm.clearOnSelect) {
                vm.bindName = "";
            } else {
                vm.bindName = c.name;
            }
            vm.filter = vm.bindName;
            toggleMenu();
        }

        function toggleMenu() {
            vm.showMenu = !vm.showMenu;
            if(vm.showMenu) {
                vm.filter = "";
            } else {
                vm.filter = vm.bindName;
            }
        }
    }

    function link(scope, elem, attrs) {

    }
}]);