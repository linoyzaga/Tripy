// server.js

// modules ============================================================================================================
var express = require('express');
var app = express();
var bodyparser = require("body-parser");
var mongojs = require("mongojs");
var multer  =   require('multer');

// configuration ======================================================================================================
var db = mongojs('mongodb://admin:123456@ds139725.mlab.com:39725/tripydb', ['Locations', 'sites', 'contactInfo', 'emails']);
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.json());
var upload = multer({ destination: "./public/images/" });

// Function ===========================================================================================================

// Get all locations
app.get('/sites', function(req, res) {
    db.Locations.find(function (err, docs) {

        // Check the connection completed
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {

            // Return value
            return res.json(docs);
        }
    });
});

// Get all sites for specific location
app.get('/sites/:id', function(req, res) {

    // db.sites.find({"locationID" : "req.body.locationID"}, function (err, docs) {
    db.sites.find(function (err, docs) {

        // Check the connection completed
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            // Return value
            return res.json(docs);
        }
    });
});

// Save contact info to the db
app.post('/contactUs', function(req, res) {

    db.contactInfo.insert(req.body, function(err, doc) {

        // Check the connection completed
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {

            // Return value
            res.json(doc);
        }
    });
});

// Save emails for news
app.post('/', function(req, res) {

    db.emails.insert(req.body, function(err, doc) {

        // Check the connection completed
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {

            // Return value
            res.json(doc);
        }
    });
});

// Add new location to DB
app.post('/helpus/addLocation', function(req, res) {

    // Add the location to the DB
    req.body.image = "images/locations/" + req.body.name + ".jpg";

    db.Locations.insert(req.body, function (err, doc) {

        // Check the connection completed
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {

            // Return value
            res.json(doc);
        }
    });
});

// Upload a photo
app.post('/uploadLocation', function(req, res) {

    // Init the storage variable
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/images/locations')
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    });

    var upload = multer({ storage : storage}).single('file');

    // Save the photo to the directory
    upload(req, res, function(err, data) {
        if(err) {
            console.log(err);
        }
        else {
            res.json({error_code:0,err_desc:null});
        }
    });
});

app.post('/uploadSite', function(req, res) {

    // Init the storage variable
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/images/sites/')
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    });

    var upload = multer({ storage : storage}).single('file');

    // Save the photo to the directory
    upload(req, res, function(err) {
        if(err) {
            console.log(err);
        }
        else {

            res.json({error_code:0,err_desc:null});
        }
    });
});

// Add new site to DB
app.post('/helpus/addSite', function(req, res) {

    db.sites.insert(req.body, function (err, doc) {

        // Check the connection completed
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {

            // Return value
            res.json(doc);
        }
    });
});

// Loading ============================================================================================================
app.listen(8080);
console.log("Server running on port 8080");