(function () {

    var HomeController = function ($log, config, users) {
        var vm = this;

        angular.extend(vm, {
            title: config.title,
            strap: config.strap,
            users: users
        });
    };

    angular
        .module('app')
        .controller('HomeController', ['$log', 'config', 'users', HomeController])
    ;

})();
