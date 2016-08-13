TripApp.controller('sitesCtrl', ['$scope', 'locations', '$http', function ($scope, locations, $http) {

    // Scrolling the page up
    window.scrollTo(0, 0);

    // Hide the side bar
    $scope.hideSideNav = function () {
        $("#wrapper").toggleClass("toggled");
    };

    getAllLocations = function () {

        return $http.get('/sites').success(function (data) {
            $scope.locations = data;
            console.log(data);
        })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    $scope.locations = getAllLocations();
}]);