(function () {

    var EditController = function ($log, $state, user, apiWrapper) {
        var vm = this;

        angular.extend(vm, {
            user: user
        });

        // NOTE: json-server doesn't allow DELETE request body params, so we have to use a fully-qualified endpoint.
        vm.delete = function () {
            apiWrapper
                .delete('users/' + vm.user.id)
                .then(
                    function (response) {
                        $log.info(response);
                        $state.transitionTo('home');
                    },
                    function (error) {
                        $log.info(error);
                    }
                )
        };

        $log.debug(user);
    };

    angular
        .module('app')
        .controller('EditController', ['$log', '$state', 'user', 'apiWrapper', EditController])
    ;

})();
