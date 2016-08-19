TripApp.controller('mainCtrl', ['$scope', 'sentEmailInfo', function ($scope, sentEmailInfo) {

    // Scrolling the page up
    window.scrollTo(0, 0);

    // Carousel movment
    $('.carousel').carousel({
        interval: 3000
    })
    
    $scope.emailSend = function () {
        sentEmailInfo.sendInfo($scope.emailForm).success(function(data){

            BootstrapDialog.show({
                message: 'Thank you!'
            });

            // Clear the email box
            $scope.emailForm = "";

        }).error(function(data){
            console.log(data);
        });
    }

}]);