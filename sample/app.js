(function (window) {

    /**
     * Created by Chris.
     */

    'use strict';


    // Grab the desired API URL from the HTML
    //

    var apiUrl = window.apiUrl;


    // Angular Configuration
    //

    function Config($stateProvider, $urlRouterProvider, $logProvider, apiUrlProvider) {
        window.console.log('Config()');

        $logProvider.debugEnabled(true);

        apiUrlProvider.setUrl(apiUrl);

        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: 'home/home.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                resolve: {
                    config: ['apiWrapper', function (apiWrapper) {
                        return apiWrapper
                            .get('config')
                            .then(
                                function (response) {
                                    return response;
                                },
                                function (error) {
                                    $log.error(error);
                                    return {
                                        title: 'Failed to get title from service',
                                        strap: 'Failed to get strap from service'
                                    }
                                }
                            );
                    }],
                    users: ['apiWrapper', function (apiWrapper) {
                        return apiWrapper
                            .get('users', null, null , true)
                            .then(
                                function (response) {
                                    return response;
                                },
                                function (error) {
                                    $log.error(error);
                                    return [];
                                }
                            );
                    }]
                }
            })

            .state('edit', {
                url: '/edit/:userId',
                templateUrl: 'edit/edit.html',
                controller: 'EditController',
                controllerAs: 'vm',
                resolve: {
                    user: ['$stateParams', 'apiWrapper', function($stateParams, apiWrapper) {
                        return apiWrapper
                            .get('users', { id: $stateParams.userId }, null, true)
                            .then(
                                function (response) {
                                    return response[0];
                                },
                                function (error) {
                                    $log.error(error);
                                    return {
                                        firstName: 'Failed to fetch user from Database!'
                                    };
                                }
                            );
                    }]
                }
            })

        ;

        $urlRouterProvider.otherwise("/");
    }

    function Run() {
        window.console.log('Run()');
    }


    // Module declarations
    //

    angular
        .module('app', ['ui.router', 'cjwApiWrapper'])
        .config(['$stateProvider', '$urlRouterProvider', '$logProvider', 'apiUrlProvider', Config])
        .run([Run])
    ;

})(window);