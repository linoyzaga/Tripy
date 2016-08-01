TripApp.controller('mainCtrl', ['$scope', function ($scope) {

    // Scrolling the page up
    window.scrollTo(0, 0);

    // Carousel movment
    $('.carousel').carousel({
        interval: 5000 //changes the speed
    })

}]);