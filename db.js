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
ig = require('instagram-node').instagram();

ig.use({ access_token: '559886220.51c66ef.1503ba29c29748d6930e9e49a7043b2d' });
ig.use({ client_id: '51c66ef6388449f1a5263daa554a373f',
         client_secret: '8436c923ddbb4b928a5a065e2055810c' });


///* OPTIONS: { [count], [min_timestamp], [max_timestamp], [min_id], [max_id] }; */
//  ig.user_media_recent(wanghongids[i], {count: 1}, function(err, medias, pagination, remaining, limit) 
//  {}
// );


// Test Mongoose Write(not exist) and Update(exist)

//five tag I will input for testing
//tag 1: #fenwaypark
//tag 2: #mfa
//tag 3: #IsabellaStewartGardner
//tag 4: #Newbury Street
//tag 5: #tdgra
var attractionTag = ['fenwaypark','mfa','IsabellaStewartGardner','IsabellaStewartGardner',
              'NewburyStreet','tdgra'];


for (i = 0; i < attractionTag.length; i++) {
  ///* OPTIONS: { [min_tag_id], [max_tag_id] }; */
  mongooseWrite(i);
  console.log("function call")
}



function mongooseWrite(i) {
  // console.log("i = " + i);

    ig.tag_media_recent('fenwaypark', {min_tag_id:100}, function(err, medias, pagination, remaining, limit) {
    var data = medias;
    console.log(data);

    //解析data, 要拿到以下的数据
  // username: String,
  // userid: String,
  // pic_id: Number,
  // tag:Number,
  // likes:Number,
  // pic_link:String


  // Model.findOneAndUpdate([conditions], [update], [options], [callback])
  Attractions.findOneAndUpdate(
  // [conditions]
  {
     userid:attractionTag[i],
  },
  // [update]
  {
    username:"user" + 2 * i,
  
});


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
        username:"user" + i,
        userid:attractionTag[i],
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
}




// Export db
module.exports = db;