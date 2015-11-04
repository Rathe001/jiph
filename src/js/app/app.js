(function() {
    let vm = {};

    vm.test = test;

    vm.test();

    function test() {
        console.log("Script loaded");
    }

}());