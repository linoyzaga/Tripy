TripApp.controller('mainCtrl', ['$scope', 'sentEmailInfo', function ($scope, sentEmailInfo) {

    // Scrolling the page up
    window.scrollTo(0, 0);

    // Carousel movment
    $('.carousel').carousel({
        interval: 3000
    })
    
    $scope.emailSend = function () {
        sentEmailInfo.sendInfo($scope.emailForm).success(function(data) {

            // Check if th form is full
            if ($scope.emailForm != undefined) {
                BootstrapDialog.show({message: 'Thank you!'});

                // Clear the email box
                $scope.emailForm = undefined;

            } else {
                BootstrapDialog.show({message: 'Please eter your email address.'});
            }
        }).error(function(data){
            console.log(data);
        });
    }
}]);