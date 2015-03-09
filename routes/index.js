var express = require('express');
var router = express.Router();
require('../db');
var mongoose = require('mongoose');
var Attractions = mongoose.model('Attractions');

/* GET home page. */
 // router.get('/', function(req, res, next) {
 //  res.render('index', { title: 'Express' });
 // });

<<<<<<< HEAD
// router.get('/welcome', function (req, res, next) {
// 	res.render('welcome', { todos: todos })
// 	} )
=======
// router.get('/', function (req, res, next) {
// 	// res.render('welcome', { todos: todos })
// 	// } )
var picList = require('../db');
>>>>>>> e4594fc6cbcb115676f297141a5814d055a88151

router.get('/', function(req, res, next) {
  res.render('index', {"picList": picList});
});


<<<<<<< HEAD
exports.welcome = function(req, res){
  Attractions.find( function(error, todos){
        console.log(todos);
    res.render('welcome', { title: 'welcome', todos: todos});
    console.log("running");
  });
}
=======
// exports.welcome = function(req, res){
// 	Attractions.find( function(error, todos){
//   	    console.log(todos);
//   	res.render('welcome', { title: 'ToDo List with Mongoose and Express', h1: 'ToDo List', todos: todos});
//   });
// }
>>>>>>> e4594fc6cbcb115676f297141a5814d055a88151



// exports.index = function(req,res) {
//     Attractions.find({},{},function(err,docs) {
//         res.render('index', {
//             "productlist" : docs
//         });
//     });
// };



module.exports = router;
