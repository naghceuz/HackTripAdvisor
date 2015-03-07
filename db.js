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
    // pic_id:Number,
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





/*************
**************
**************/
// Call tripAdvisor
// var attractionTag = require('./tripAdvisor');
var attractionTag = ['fenwaypark','mfa','IsabellaStewartGardner',
              'NewburyStreet','tdgarden'];



/*
** Write into Databse
*/
for (var i = 0; i < attractionTag.length; i++) {
  instagram(i);
}


function instagram(i) {
  ig.tag_media_recent(attractionTag[i] , {max_tag_id:1}, function(err, medias, pagination, remaining, limit) {
    loopMongooseWrite(medias, medias.length, attractionTag[i]);
  });
}


function loopMongooseWrite(medias, length, tag) {
  for (var j = 0; j < length; j++) {
    mongooseWrite(medias, j, tag);
  }
}


function mongooseWrite(medias, j, tag) {

    // Model.findOneAndUpdate([conditions], [update], [options], [callback])
    Attractions.findOneAndUpdate(
    {  // [conditions]
      userid:medias[j].user.id,
      // pic_id:medias[j].id,
    },
    {  // [update]
      userid:medias[j].user.id,
      username:medias[j].user.username,
      // pic_id: medias[j].id,
      pic_link:medias[j].link,
      img_link:medias[j].images.standard_resolution.url,
      likes:medias[j].likes.count,
      tagName:tag,
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
            userid:medias[j].user.id,
            username:medias[j].user.username,
            // pic_id: medias[j].id,
            pic_link:medias[j].link,
            img_link:medias[j].images.standard_resolution.url,
            likes:medias[j].likes.count,
            tagName:tag,
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





/*
** Read from Database
*/
var bestPics = [];

for (var i = 0; i < attractionTag.length; i++) {
  var bestPicsNow = mongooseLikes(attractionTag[i], i);
  // console.log("***\n***\n***\n***\n***\n" + i);
  // console.log(bestPicsNow);
}
                                                   
function mongooseLikes(tag, i) {
  // tag传进来了   console.log(tag);
  // i传进来了     console.log(i);
  Attractions.find(
  {  // [conditions]
      tagName:tag,
    }, // [callback] 
    function (err, pics) {
      if(err) {
          return console.log("MongoDB Error: " + err);
        }
        if(!pics) {
          return console.log("No pic with tag " + tag);
        }
        else {
          // console.log(pics);
          // i传进来了    console.log(i);
          // console.log(tag);
          var mostLikesPic = mostLikes(pics, i); 
          bestPics.push(mostLikesPic);
          // console.log("***\n***\n***\n***\n***\n" + i);
          // console.log(bestPics);
          return bestPics;
        }
    });
}

function mostLikes(pics, i) {
  // i传进来了    console.log(i);
  var best = pics[0];
  // console.log("***\n***\n***\n***\n***\n" + i);
  // console.log(best);

  for (var j = 0; j < pics.length; j++) {
    if (pics[j].likes > best.likes) {
      best = pics[j];
    }
  }
  // console.log(best);
  return best;
}
                     

module.exports = bestPics;