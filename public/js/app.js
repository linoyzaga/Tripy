// Creating the app module
var TripApp = angular.module('TripApp', ['ngRoute', 'ngResource']);

// Configure the routes
TripApp.config(function($routeProvider) {
    $routeProvider

        // Route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainCtrl'
        })

        // Route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutCtrl'
        })

        // Route for the sites page
        .when('/sites', {
            templateUrl : 'pages/sites.html',
            controller  : 'sitesCtrl'
        })
    
        // Route for the help us page
        .when('/helpus', {
            templateUrl : 'pages/helpUs.html',
            controller  : 'helpUsCtrl'
        })

        // Route to dynammic id plan trip page
        .when('/sites/:id', {
            templateUrl : 'pages/plan.html',
            controller  : 'planCtrl'
        })

        .when('/printPlan', {
            templateUrl : 'pages/printPlan.html',
            controller  : 'printPlanCtrl'
        })

        // Route back to home page
        .otherwise(
            {redirectTo:'/'}
        );
});