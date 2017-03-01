(function (window) {

    /**
     * Created by Chris.
     */


    'use strict';


    // Grab the desired API URL from the HTML if available
    //

    var apiUrl = window.apiUrl;


    // Angular Configuration
    //

    function Config($stateProvider, $urlRouterProvider, $logProvider, apiUrlProvider) {
        window.console.log('Config()');

        $logProvider.debugEnabled(true);

        apiUrlProvider.setUrl(apiUrl);

        // TODO: Re-factor this into 'home' directory so it's _actually_ modular!
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            });

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