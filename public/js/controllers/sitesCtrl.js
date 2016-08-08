TripApp.controller('sitesCtrl', ['$scope', function ($scope) {

    // Scrolling the page up
    window.scrollTo(0, 0);

    // Hide the side bar
    $scope.hideSideNav = function () {
        $("#wrapper").toggleClass("toggled");
    };

}]);