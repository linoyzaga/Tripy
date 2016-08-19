TripApp.controller('sitesCtrl', ['$scope', 'getLocations', '$rootScope', function ($scope, getLocations, $rootScope) {

    // Scrolling the page up
    window.scrollTo(0, 0);

    // Hide the side bar
    $scope.hideSideNav = function () {
        $("#wrapper").toggleClass("toggled");
    };

    // Getting all the locations from the server
    getLocations.getAllLocations().success(function(data){

        // Save all the locations
        $scope.allLocations = data;
    }).error(function(data){
        console.log(data);
    });

    $scope.saveCurrLocation = function (location) {
        $rootScope.currLocation = location;
    }

    // Pagination
/*    $scope.currPage = 0;
    $scope.pageSize = 16;

    $scope.numberOfPages = function () {
        return Math.ceil($scope.allLocations.length / $scope.pageSize);
    }*/
}]);