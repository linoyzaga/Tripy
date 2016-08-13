// app/models/sites.js

// grab the mongoose module
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SitesSchema   = new Schema({
    name : String,
    image : String,
    rating : int,
    locationOnMap : String,
    activityHowrs : String,
    history : String,
    price : String,
    tips : String,
    locationID : String
});

var Sites = mongoose.model('sites', SitesSchema);

module.exports = Sites;
