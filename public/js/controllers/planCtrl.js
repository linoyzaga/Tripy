TripApp.controller('planCtrl', ['$scope', 'getSites', '$rootscope', function ($scope, getSites, $rootscope) {

    // Getting all the locations from the server
    getSites.getSitesById($rootscope.currLocationId).success(function(data){
        $scope.allLocations = data;
    }).error(function(data){
        console.log(data);
    })
}]);