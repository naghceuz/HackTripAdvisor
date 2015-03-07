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
  username: String,
  userid: String,
  pic_id: Number,
  tag:Number,
  likes:Number,
  pic_link:String
});

// A model is like a class with which we construct documents
var Attractions = mongoose.model('Attractions', AttractionSchema);


// Call Instagram API
var ig = require('instagram-node').instagram();

ig.use({ access_token: '559886220.51c66ef.1503ba29c29748d6930e9e49a7043b2d' });
ig.use({ client_id: '51c66ef6388449f1a5263daa554a373f',
         client_secret: '8436c923ddbb4b928a5a065e2055810c' });

///* OPTIONS: { [min_tag_id], [max_tag_id] }; */
ig.tag_media_recent('HackTripAdvisor', {min_tag_id:10}, function(err, medias, pagination, remaining, limit) {

<<<<<<< HEAD
	var data = medias;
	console.log( data );

});
=======
// Call TripAdvisor API
>>>>>>> b80d694aabe000407eedb2d51d77307f28a13109

///* OPTIONS: { [count], [min_timestamp], [max_timestamp], [min_id], [max_id] }; */
//  ig.user_media_recent(wanghongids[i], {count: 1}, function(err, medias, pagination, remaining, limit) 
//  {}
// );


// Test Mongoose Write(not exist) and Update(exist)
var attractionID = ['260732813','559886320','138975020','228499567'];

for (i = 0; i < attractionID.length; i++) {

  Attractions.findOneAndUpdate(
  {
    userid:attractionID[i],
  },
  {
    username:"user" + 2 * i,
  }, function (err, found) {
    if(err) {
      return console.log("MongoDB Error: " + err);
    }
    else if(!found) {
      console.log("Not Exist");
      Attractions.create (
      {
        username:"user" + i,
        userid:attractionID[i],
      }, function (err, createItem) {
        if(err) {
                return console.log("MongoDB Error: " + err);
        }
      });
    }
    else {
      console.log("Exist");
    }
  });
}




// Export db
module.exports = db;