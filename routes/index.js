var express = require('express');
var router = express.Router();

/* GET home page. */
 router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
 });


router.get('/welcome', function(req, res, next){
	res.render('welcome')
})


exports.welcome = function(req,res) {
    Attractions.find({},{},function(err,docs) {
        res.render('welcome', {
            "productlist" : docs
        });
    });
};



// exports.index = function(req,res) {
//     Attractions.find({},{},function(err,docs) {
//         res.render('index', {
//             "productlist" : docs
//         });
//     });
// };



module.exports = router;
