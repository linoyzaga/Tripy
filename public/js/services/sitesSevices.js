TripApp.factory('getLocations', ['$http', function($http) {

    var fac = {};

    // Getting the locations from the DB
    fac.getAllLocations = function () {

        return $http.get('/sites');
    }

    // Return value
    return fac;
}]);

TripApp.factory('getSites', ['$http', function($http) {

    var fac = {};

    // Getting the locations from the DB
    fac.getSitesById = function (id) {

        return $http.get('/sites/:id', {locationID: id});
    }

    // Return value
    return fac;
}]);

/*
TripApp.factory('addLocation', ['$http', function($http) {

    var fac = {};

    // Getting the locations from the DB
    fac.addNewLocation = function (name, imageUrl) {

        return $http.post('/helpus', {"name": name, "iamge": imageUrl});
    };

    // Return value
    return fac;
}]);*/
