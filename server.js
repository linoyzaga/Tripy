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

// Function ===========================================================================================================

// Get all locations
app.get('/sites', function(req, res) {
    console.log("Get all locations function node received");

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

    console.log("Get all sites for specific location function node received");

    console.log(req);

    db.sites.find({"locationID" : "req.body.locationID"}, function (err, docs) {

        // Check the connection completed
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            console.log(docs[0]);

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

    debugger;
    console.log("Post new locaton function node received");
    console.log(req.body);

    // Init the storage variable
    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './uploads');
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now());
        }
    });
    var upload = multer({ storage : storage}).single('userPhoto');

    // Save the photo to the directory
    upload(req,res,function(err) {
        if(err) {
            console.log("Error uploading file.");
        }
        console.log("File is uploaded");
    });

    // Save the photo location to the db
    db.Locations.insert(req.body, function (err, doc) {

        // Check the connection completed
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            res.json(doc);
        }
    });
});

// Add new site to DB
app.post('/helpus/addSite', function(req, res) {

    console.log("Post new site function node received");
    console.log(reg.body);

    db.sites.insert(req.body, function (err, doc) {

        // Check the connection completed
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            res.json(doc);
        }
    });
});

// Loading ============================================================================================================
app.listen(8080);
console.log("Server running on port 8080");