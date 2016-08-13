TripApp.factory('locations', ['$resource', '$http', function($resource, $http) {

    var fac = {};

    // Getting the locations from the DB
    fac.getAllLocations = function () {

        return $http.get('/sites').success(function (data) {
            $scope.locations = data;
            console.log(data);
        })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    return fac;
}]);