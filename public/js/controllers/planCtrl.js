TripApp.controller('planCtrl', ['$scope', 'getSites', '$rootScope', function ($scope, getSites, $rootScope) {

    $scope.location = $rootScope.currLocation;
    $scope.currSite = {};
    $scope.selectedSites = [];

    // Getting all the locations from the server
    getSites.getAllSites().success(function(data){

        // Save all the sites
        $scope.allSites = data;

        // Get sites by Id
        $scope.sitesById = [];

        for (var i=0; i< $scope.allSites.length; i++)
        {
            if ($scope.allSites[i].locationID == $rootScope.currLocation._id)
            {
                $scope.sitesById.push($scope.allSites[i]);
            }
        }

    }).error(function(data){
        console.log(data);
    })

    // Save the current checked item for model
    $scope.saveCurrSite = function (site) {
        $scope.currSite = site;
    }

    // Calculate the trip duration
    $scope.planTrip = function () {
        $scope.selectedSites = [];

        // Pass all the sites and get the selected ones
        for (var i = 0; i < $scope.sitesById.length; i++){

            // Check if selected
            if ($scope.sitesById[i].selected)
            {
                $scope.selectedSites.push($scope.sitesById[i]);
            }
        }

        // Calculate the number of sites per day
        $scope.sitesPerDay = Math.round($scope.selectedSites.length / $scope.numOfDays);
        $scope.trip = [];

        // Pass all the days
        for (var i = 0; i< $scope.numOfDays; i++) {
            // Check if thats the last day and insert all the sites left
            if (i == ($scope.numOfDays - 1)) {
                // Insert all the sites left to the specific day
                for (var j = 0; j < $scope.selectedSites.length; j++) {
                    // Create an object to insert the trip array
                    var currSite = $scope.selectedSites[j];
                    $scope.trip.push({"day": i, "site": currSite});
                }

                // remove all the sites left in the selected array
                $scope.selectedSites = [];
            }
            else {

                // Init the first place
                source = $scope.selectedSites[0].address;
                delete $scope.selectedSites[0];
                var indexInSelected = 1;

                // Pass all the sites per day and insert them
                for (var j = 1; j < $scope.sitesPerDay; j++) {

                    destination = $scope.selectedSites[indexInSelected];


                }
            }
        }
    }

    // Print - Check it!!!!!!
    $scope.printDiv = function(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }
}]);