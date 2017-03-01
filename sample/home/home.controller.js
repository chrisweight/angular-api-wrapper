(function () {

    /**
     * Created by Chris.
     */


    'use strict';


    var HomeController = function ($log, apiWrapper) {
        var vm = this;

        angular.extend(this, {
            title: '',
            strap: ''
        });

        apiWrapper
            .get('config')
            .then(
                function(response) {
                    vm.title = response.title;
                    vm.strap = response.strap;
                },
                function(error) {
                    $log(error);
                    vm.title = 'failed to get title from service';
                    vm.strap = 'failed to get strap from service';
                }
            )
    };


    angular
        .module('app')
        .controller('HomeController', ['$log', 'apiWrapper', HomeController])
    ;

})();
