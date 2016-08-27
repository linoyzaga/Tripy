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

        // Updating the stars
        $scope.stars = [];

        for (var i = 0; i < 5; i++) {
            $scope.stars.push({filled: i < $scope.currSite.rating});
        }

    }

    // Calculate the trip duration
    $scope.planTrip = function () {

        $scope.selectedSites = [];

        // Pass all the sites and get the selected ones
        for (var i = 0; i < $scope.sitesById.length; i++) {

            // Check if selected
            if ($scope.sitesById[i].selected) {
                $scope.selectedSites.push($scope.sitesById[i]);
            }
        }

        // Calculate the number of sites per day
        $scope.sitesPerDay = Math.round($scope.selectedSites.length / $scope.numOfDays);

        // Check if there are too many sites per day
        if ($scope.sitesPerDay > 5) {
            BootstrapDialog.show({
                message: 'Your have choosen too many sites.'
            });
        }
        else {

            // Init the trip plan
            $rootScope.trip = [];
            $rootScope.days = $scope.numOfDays;

            // Pass all the days
            for (var i = 1; i <= $scope.numOfDays; i++) {

                // Check if thats the last day and insert all the sites left
                if (i == $scope.numOfDays) {

                    // Insert all the sites left to the specific day
                    for (var j = 0; j < $scope.selectedSites.length; j++) {

                        // Create an object to insert the trip array
                        var currSite = $scope.selectedSites[j];
                        $rootScope.trip.push({"day": i, "site": currSite});
                    }

                    // remove all the sites left in the selected array
                    $scope.selectedSites = [];
                }
                else {

                    // Get the first site and it's coordinates
                    var currSite = $scope.selectedSites[0];
                    var currLat = currSite.latitude;
                    var currLon = currSite.longitude;
                    $scope.selectedSites.splice(0, 1);

                    $rootScope.trip.push({"day": i, "site": currSite});

                    // Pass the number of site need to be close
                    for (var j = 0; j < $scope.sitesPerDay - 1; j++) {

                        // Check the current distance to compare to
                        var newSiteIndex = 0;
                        var newSite = $scope.selectedSites[0];
                        var currDistance = $scope.getDistanceFromLatLonInKm(currLat, currLon, $scope.selectedSites[0].latitude, $scope.selectedSites[0].longitude);

                        for (var z = 1; z < $scope.selectedSites.length; z++) {
                            var newDistance = $scope.getDistanceFromLatLonInKm(currLat, currLon, $scope.selectedSites[z].latitude, $scope.selectedSites[z].longitude);

                            // Check which distance is smaller
                            if (currDistance > newDistance) {
                                currDistance = newDistance;
                                newSite = $scope.selectedSites[z];
                                newSiteIndex = z;
                            }

                        }

                        // Insert the new site with the smallest distance to the trip
                        $rootScope.trip.push({"day": i, "site": newSite});
                        $scope.selectedSites.splice(newSiteIndex, 1);

                        // Make the new site to the curr site
                        currSite = newSite;

                    }
                }
            }
        }
    }

    // Calc the distance methods
    $scope.getDistanceFromLatLonInKm = function(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = $scope.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = $scope.deg2rad(lon2-lon1);
        var a =
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos($scope.deg2rad(lat1)) * Math.cos($scope.deg2rad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d;
    }

    $scope.deg2rad = function(deg) {
        return deg * (Math.PI/180)
    }
}]);