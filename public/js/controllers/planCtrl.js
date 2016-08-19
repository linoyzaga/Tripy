TripApp.controller('planCtrl', ['$scope', 'getSites', '$rootScope', function ($scope, getSites, $rootScope) {

    $scope.location = $rootScope.currLocation;

    // Getting all the locations from the server
    getSites.getSitesByLocationId($scope.location._id).success(function(data){

        // Save all the sites
        debugger;
        console.log(data);
        $scope.allSites = data;
    }).error(function(data){
        console.log(data);
    })
}]);