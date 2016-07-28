// Create controllers module
//var TripCtrls = angular.module('TripCtrls', []);

TripApp.controller('sitesCtrl', ['$scope', 'sites', function($scope, sites) {
    
    // Get the sites from the service
    $scope.sites = sites;
}]);