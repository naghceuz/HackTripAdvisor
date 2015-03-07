// Mongoose Configuration
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/HackTripAdvisor');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Successfully Connected to Mongoose.");
});

// Data Element Style 
var AttractionSchema = new mongoose.Schema({
/*******************************************
  id: String,
  username: String,
  like: Number 
*******************************************/
});

// A model is like a class with which we construct documents
var Attractions = mongoose.model('Attractions', AttractionSchema);


// Call Instagram API
var ig = require('instagram-node').instagram();

ig.use({ access_token: '559886220.51c66ef.1503ba29c29748d6930e9e49a7043b2d' });
ig.use({ client_id: '51c66ef6388449f1a5263daa554a373f',
         client_secret: '8436c923ddbb4b928a5a065e2055810c' });










// Export db
module.exports = db;