TripApp.controller('sitesCtrl', ['$scope', function ($scope) {

    // Hide the side bar
    $scope.hideSideNav = function () {
                $("#wrapper").toggleClass("toggled");
        };

}]);