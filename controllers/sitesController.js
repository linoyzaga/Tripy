// Create controllers module
var TripCtrls = angular.module('TripCtrls', []);

TripCtrls.controller('sitesController', ['$scope', 'sites', function($scope, sites) {
    
    // Get the sites from the service
    $scope.sites = sites;
}]);