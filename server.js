// server.js

// modules ============================================================================================================
var express = require('express');
var app = express();
var bodyparser = require("body-parser");
var mongojs = require("mongojs");

// configuration ======================================================================================================
var db = mongojs('mongodb://admin:123456@ds139725.mlab.com:39725/tripydb', ['Locations']);
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
            console.log(docs);

            // Return value
            return res.json(docs);
        }
    });
});

// Loading ============================================================================================================
app.listen(8080);
console.log("Server running on port 8080");