// Creating the app module
var TripApp = angular.module('TripApp', ['ngRoute']);

    // Configure the routes
    TripApp.config(function($routeProvider) {
        $routeProvider
        
            // Route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // Route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })
        
            // Route for the sites page
            .when('/sites', {
                templateUrl : 'pages/sites.html',
                controller  : 'sitesController'
            })

            // Route back to home page
            .otherwise(
                {redirectTo:'/'}
            );
    });
