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
// // Call Instagram API
var ig = require('instagram-node').instagram();

ig.use({ access_token: '559886220.51c66ef.1503ba29c29748d6930e9e49a7043b2d' });
ig.use({ client_id: '51c66ef6388449f1a5263daa554a373f',
         client_secret: '8436c923ddbb4b928a5a065e2055810c' });



// require('./tripAdvisor');

var attractionTag = ['fenwaypark','mfa','IsabellaStewartGardner',
              'NewburyStreet','tdgarden'];




for (i = 0; i < attractionTag.length; i++) {
  instagram(i);
}



// ig.tag_media_recent("HackTripAdvisor" , {max_tag_id:1}, function(err, medias, pagination, remaining, limit) {

//     var mediasLength = medias.length;
    
//     console.log("Data length is " + mediasLength);
//     console.log("userid = " + medias[0].user.id);
//     console.log("username = " + medias[0].user.username);
//     console.log("pic_id = " + medias[0].id);
//     console.log("pic_link = " + medias[0].link);
//     console.log("img_link = " + medias[0].images.standard_resolution.url);
//     console.log("likes = " + medias[0].likes.count);
//     console.log("tagName = " + medias[0].tags[0]);

// });


function instagram(i) {
  ig.tag_media_recent(attractionTag[i] , {max_tag_id:1}, function(err, medias, pagination, remaining, limit) {
    mongooseWrite(medias);
    // console.log("***\n***\n***\n***\n***\n" + attractionTag[i]);
    // console.log(medias[0].user.id);
  });
}


function mongooseWrite(medias) {

    // Model.findOneAndUpdate([conditions], [update], [options], [callback])
    Attractions.findOneAndUpdate(
    {  // [conditions]
      userid:medias[0].user.id,
      // pic_id:medias[0].id,
    },
    {  // [update]
      userid:medias[0].user.id,
      username:medias[0].user.username,
      // pic_id: medias[0].id,
      pic_link:medias[0].link,
      img_link:medias[0].images.standard_resolution.url,
      likes:medias[0].likes.count,
      tagName:medias[0].tags[0],
    }, // [callback] if document exists, callback--'found' will be null
      function (err, found) {
        // console.log("i = " + i);
        if(err) {
          return console.log("MongoDB Error: " + err);
        }
        else if(!found) {   // 'found' is null, then create new
          console.log("Not Exist");
          //console.log('i = ' + i); 
          Attractions.create (  // Model.create(doc(s), [callback])
          {
            userid:medias[0].user.id,
            username:medias[0].user.username,
            // pic_id: medias[0].id,
            pic_link:medias[0].link,
            img_link:medias[0].images.standard_resolution.url,
            likes:medias[0].likes.count,
            tagName:medias[0].tags[0],
          }, // [callback]
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
}



// Export db
module.exports = db;