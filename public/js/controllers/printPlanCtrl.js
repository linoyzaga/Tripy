TripApp.controller('printPlanCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

    // Init the variables
    $scope.location = $rootScope.currLocation;
    $scope.trip = $rootScope.trip;
    $scope.days = [];
    var length = $rootScope.days;

    // Create a days array
    for (var i = 0; i < length; i++) {
        $scope.days.push(i + 1);
    }

    // Print
    $scope.printDiv = function() {
        var printContents = document.getElementById("printPlanDiv").innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

}]);