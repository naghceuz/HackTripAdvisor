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
    userid:Number,
    username:String,
    pic_id:Number,
    pic_link:String,
    img_link:String,
    likes:Number,
    tagName:String
});

// A model is like a class with which we construct documents
var Attractions = mongoose.model('Attractions', AttractionSchema);
// Call Instagram API
ig = require('instagram-node').instagram();

ig.use({ access_token: '559886220.51c66ef.1503ba29c29748d6930e9e49a7043b2d' });
ig.use({ client_id: '51c66ef6388449f1a5263daa554a373f',
         client_secret: '8436c923ddbb4b928a5a065e2055810c' });



require('./tripAdvisor');

var attractionTag = ['fenwaypark','mfa','IsabellaStewartGardner','IsabellaStewartGardner',
              'NewburyStreet','tdgra'];


for (i = 0; i < attractionTag.length; i++) {
  ///* OPTIONS: { [min_tag_id], [max_tag_id] }; */
  mongooseWrite(i);
}



ig.tag_media_recent("HackTripAdvisor" , {max_tag_id:1}, function(err, medias, pagination, remaining, limit) {
    var theData = medias;
    var theDatelength = theData.length
    
    console.log(theData)
    console.log("Data length is " + theDatelength)
    console.log("userid " + theData[0].user.id)
    console.log("username " + theData[0].user.username)
    console.log("pic_id: " + theData[0].id)
    console.log("userid in data1 " + theData[1].user.id)
     // pic_link:data[0].link,
     // img_link:data[0].images.standard_resolution.url,
     // likes:data[0].likes.count,
     // tagName:data[0].tags[0]

});




function mongooseWrite(i) {

  //attractionTag[i]  = "fenwaypark"
    ig.tag_media_recent(attractionTag[i] , {max_tag_id:1}, function(err, medias, pagination, remaining, limit) {
    var theData = medias;

  // Model.findOneAndUpdate([conditions], [update], [options], [callback])
  Attractions.findOneAndUpdate(
  // [conditions]
  {
     // userid:theData[i].user.id
     // pic_id:data[0].id
  },
  // [update]
  {
      userid:theData[i].user.id,
      username:theData[i].user.username,
      pic_id: theData[i].id,
      pic_link:theData[i].link,
      img_link:theData[i].images.standard_resolution.url,
      likes:theData[i].likes.count
  }, 
  // [callback] if document exists, callback--'found' will be null
  function (err, found) {
    // console.log("i = " + i);
    
    if(err) {
      return console.log("MongoDB Error: " + err);
    }
    else if(!found) {   // 'found' is null, then create new
      console.log("Not Exist");
      //console.log('i = ' + i); 

      // Model.create(doc(s), [callback])
      Attractions.create (
      {
       
      userid:theData[i].user.id,
      username:theData[i].user.username,
      pic_id: theData[i].id,
      pic_link:theData[i].link,
      img_link:theData[i].images.standard_resolution.url,
      likes:theData[i].likes.count

      }, 
      // [callback]
      function (err, createItem) {
        if(err) {
                return console.log("MongoDB Error: " + err);
        }
      });
    }
    else {
      console.log("Exist");
    }
  });
});
}



// Export db
module.exports = db;