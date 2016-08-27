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
    fac.addNewLocation = function (name) {

        return $http.post('helpus/addLocation', {"name": name});
    };

    // Return value
    return fac;
}]);

TripApp.factory('addSite', ['$http', function($http) {

    var fac = {};

    // Getting the locations from the DB
    fac.addNewSite = function (name, image, rating, address, activityHours, history, publicTransport, price, tips, locationID, latitude, longitude) {

        return $http.post('helpus/addSite', {"name": name, "image" : image, "rating" : rating, "address" : address, "activityHours" : activityHours,
            "history" : history, "publicTransport" : publicTransport, "price" : price, "tips" : tips, "locationID" : locationID, "latitude" : latitude, "longitude" : longitude});
    };

    // Return value
    return fac;
}]);

TripApp.factory('uploadILocation', ['$http', function($http) {

    var fac = {};

    // Getting the locations from the DB
    fac.uploadNewImage = function (file) {

        return $http.post('uploadLocation', file, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
    };

    // Return value
    return fac;
}]);

TripApp.factory('uploadSite', ['$http', function($http) {

    var fac = {};

    // Getting the locations from the DB
    fac.uploadNewImage = function (file) {

        return $http.post('uploadSite', file, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
    };

    // Return value
    return fac;
}]);
