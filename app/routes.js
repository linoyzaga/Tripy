// app/routes.js

/*var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api', router);

// Route to Locations
router.route('/Locations')

// create a location (accessed at POST http://localhost:8080/api/locations)
    .post(function(req, res) {

        var Location = new Location();      // create a new instance of the Bear model
        Location.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        Location.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Location created!' });
        });

    })

    // get all the locations (accessed at GET http://localhost:8080/api/locations)
    .get(function(req, res) {
        Location.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(locations);
        });
    });

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);*/

// grab the locations model we just created
var Locations = require('./models/locations');

module.exports = function(app) {

    // server routes ===========================================================

    // sample api route
    app.get('/api/locations', function(req, res) {

        // use mongoose to get all nerds in the database
        Locations.find(function(err, locations) {

            // if there is an error retrieving, send the error.
            if (err)
                res.send(err);

            res.json(locations); // return all nerds in JSON format
        });
    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

};
