var express = require('express');
var router = express.Router();

/* GET home page. */
 // router.get('/', function(req, res, next) {
 //  res.render('index', { title: 'Express' });
 // });

// router.get('/', function (req, res, next) {
// 	// res.render('welcome', { todos: todos })
// 	// } )
var picList = require('../db');

router.get('/', function(req, res, next) {
  res.render('index', {"picList": picList});
});


// exports.welcome = function(req, res){
// 	Attractions.find( function(error, todos){
//   	    console.log(todos);
//   	res.render('welcome', { title: 'ToDo List with Mongoose and Express', h1: 'ToDo List', todos: todos});
//   });
// }


// exports.index = function(req,res) {
//     Attractions.find({},{},function(err,docs) {
//         res.render('index', {
//             "productlist" : docs
//         });
//     });
// };



module.exports = router;
