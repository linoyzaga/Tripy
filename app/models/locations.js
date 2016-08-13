// app/models/locations.js

// grab the mongoose module
 var mongoose     = require('mongoose');
 var Schema       = mongoose.Schema;

 var LocationSchema   = new Schema({
     name: String,
     image: String
 });

var Locations = mongoose.model('locations', LocationSchema);

module.exports = Locations;
