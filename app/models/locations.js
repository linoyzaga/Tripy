// app/models/locations.js

// grab the mongoose module
 var mongoose     = require('mongoose');
 var Schema       = mongoose.Schema;

 var LocationSchema   = new Schema({
     name: String,
     image: String
 });

 module.exports = mongoose.model('Locations', LocationSchema);


