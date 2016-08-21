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
    fac.getAllSites = function () {

        return $http.get('/sites/:id');
    }

    // Return value
    return fac;
}]);

TripApp.factory('sentContactInfo', ['$http', function($http) {

    var fac = {};

    // Getting the locations from the DB
    fac.sendInfo = function (contactInfo) {

        return $http.post('/contactUs', {name: contactInfo.name, email: contactInfo.email, subject: contactInfo.subject, message: contactInfo.message});
    }

    // Return value
    return fac;
}]);

TripApp.factory('sentEmailInfo', ['$http', function($http) {

    var fac = {};

    // Getting the locations from the DB
    fac.sendInfo = function (email) {

        return $http.post('/', {email: email});
    }

    // Return value
    return fac;
}]);

TripApp.factory('addLocation', ['$http', function($http) {

    var fac = {};

    // Getting the locations from the DB
    fac.addNewLocation = function (name, image) {

        return $http.post('helpus/addLocation', {"name": name, "image": image});
    };

    // Return value
    return fac;
}]);

TripApp.factory('addSite', ['$http', function($http) {

    var fac = {};

    // Getting the locations from the DB
    fac.addNewLocation = function () {

        return $http.post('helpus/addSite', {});
    };

    // Return value
    return fac;
}]);
