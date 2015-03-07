var express = require('express');
var router = express.Router();
require('../db');
var mongoose = require('mongoose');
var Attractions = mongoose.model('Attractions');

/* GET home page. */
 // router.get('/', function(req, res, next) {
 //  res.render('index', { title: 'Express' });
 // });

// router.get('/welcome', function (req, res, next) {
// 	res.render('welcome', { todos: todos })
// 	} )

router.get('/', function(req, res, next) {
  res.render('index');
});


exports.welcome = function(req, res){
  Attractions.find( function(error, todos){
        console.log(todos);
    res.render('welcome', { title: 'welcome', todos: todos});
    console.log("running");
  });
}



// exports.index = function(req,res) {
//     Attractions.find({},{},function(err,docs) {
//         res.render('index', {
//             "productlist" : docs
//         });
//     });
// };



module.exports = router;
