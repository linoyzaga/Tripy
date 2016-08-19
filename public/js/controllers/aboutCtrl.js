TripApp.controller('aboutCtrl', ['$scope', 'sentContactInfo', function($scope, sentContactInfo) {
    
    // Scrolling the page up
    window.scrollTo(0,0);

    // Init the send info data
    $scope.contactInfo = {};

    // Send the users info to the db
    $scope.sendInfo = function(){

        $scope.contactInfo.name = $scope.formName;
        $scope.contactInfo.email = $scope.formEmail;
        $scope.contactInfo.subject = $scope.formSubject;
        $scope.contactInfo.message = $scope.formMessage;

        debugger;
        // Send the info to the DB
        $scope.didSend = sentContactInfo.sendInfo($scope.contactInfo);

        // Check if the action work correct
        if ($scope.didSend) {
            console.log("The contact info saved");

            BootstrapDialog.show({
                message: 'Your message have been sent. Thank you!'
            });

            // Clearing the boxes
            $scope.formName = "";
            $scope.formEmail = "";
            $scope.formSubject = "";
            $scope.formMessage = "";
        }
        else {
            console.log("The contact info did not save");
        }
    };

}]);