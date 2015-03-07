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





/*
** Use tripAdvisor API
*/

var request = require('request');

var attractionTag = [];

//function attractionArray {
request({url: 'http://api.tripadvisor.com/api/partner/2.0/location/60745/attractions?key=HackTripAdvisor-ade29ff43aed', json: true}, function(err, res, json) {
    if (err) {
        throw err;
    }
    // console.log(json);
    for (var q = 0; q < 20; q++) {
      arrayAdd(q, json);
    }
    // return attractionTag;
});
//}

function arrayAdd(q, obj) {
  var s = obj.data[q].name;
  s = s.replace(/\W/g, ''); 
  s = s.toLowerCase();
  s = s.toString();  // data type is different. convert json to string.
  attractionTag.push(s);
  // console.log(attractionTag);
  // return attractionTag;
}

// var attractionTag = ['fenwaypark','mfa','IsabellaStewartGardner',
//               'NewburyStreet','tdgarden'];

// var attractionArray = require('./tripAdvisor');

// var attractionTag = attractionArray;

var tempMedias = [];
ig.tag_media_recent('fenwaypart' , {max_tag_id:1}, function(err, medias, pagination, remaining, limit) {
  tempMedias = medias;
});
/*
** Write into Databse
*/

// Regularly Fetch Data from Instagram and Write into Database
function delay() {

// never has lines more than simply calling a function in for loop in JavaScript
for (var i = 0; i < attractionTag.length; i++) {
  instagram(i, attractionTag[i]);
}


function instagram(i, tag) {
  // console.log(tag);
  ig.tag_media_recent(tag , {max_tag_id:1}, function(err, medias, pagination, remaining, limit) {
    if (!medias) {
      medias = tempMedias;
    }
    loopMongooseWrite(medias, medias.length, tag);
  });
}


function loopMongooseWrite(medias, length, tag) {
  for (var j = 0; j < length; j++) {
    mongooseWrite(medias, j, tag);
  }
}


function mongooseWrite(medias, j, tag) {
    // console.log(tag);

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
// }
// var interval = setInterval(loop, 1000);





/*
** Read from Database
*/

// function delay () {
var bestPics = [];

for (var k = 0; k < attractionTag.length; k++) {
  var bestPicsNow = mongooseLikes(attractionTag[k], k);
  // console.log("***\n***\n***\n***\n***\n" + i);
  // console.log(bestPicsNow);
}
                                                   
function mongooseLikes(tag, k) {
  // tag传进来了   console.log(tag);
  // i传进来了     console.log(k);
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
          // i传进来了    console.log(k);
          // console.log(tag);
          var mostLikesPic = mostLikes(pics, k); 
          bestPics.push(mostLikesPic);
          // console.log("***\n***\n***\n***\n***\n" + k);
          console.log(bestPics);
          return bestPics;
        }
    });
}

function mostLikes(pics, k) {
  // i传进来了    console.log(k);
  var best = pics[0];
  // console.log("***\n***\n***\n***\n***\n" + k);
  // console.log(best);

  for (var p = 0; p < pics.length; p++) {
    if (pics[p].likes > best.likes) {
      best = pics[p];
    }
  }
  // console.log(best);
  return best;
}

        

module.exports = bestPics;
}
var delayTime = setTimeout(delay, 3000); 






// var productSchema = new mongoose.Schema({
//     name: String,
//     description: String
// });
// var Product = mongoose.model('Product', productSchema);







