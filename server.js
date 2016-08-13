// server.js

// modules =================================================
var express = require('express');
var app = express();
var bodyparser = require("body-parser");

// configuration ===========================================
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://ds139725.mlab.com:39725/tripydb';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    // Check the connections completed
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    }
    else {
        console.log('Connection established to', url);

        // Functions configuration ================================

        // Get all the locations
        app.get('/sites', function (req, res) {

            console.log("Get all locations function node received");

            db.collection('Locations').find(function (err, docs) {
                console.log(docs);
                res.json(docs);
            })

            console.log(Locations);

            /*Locations.forEach(function (err, doc) {

             assert.equal(err, null);

             if (doc != null) {
             console.dir(doc);
             } else {
             callback();
             }*/

        })
        db.close();
    }
});

app.use(express.static(__dirname + "/public"));
app.use(bodyparser.json());

// Load the server application
app.listen(8080);
console.log("Server running on port 8080");