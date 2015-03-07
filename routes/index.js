var express = require('express');
var router = express.Router();

/* GET home page. */
 // router.get('/', function(req, res, next) {
 //  res.render('index', { title: 'Express' });
 // });

// router.get('/', function (req, res, next) {
// 	// res.render('welcome', { todos: todos })
// 	// } )

router.get('/', function(req, res, next) {
  res.render('index');
});

exports.index = function(req, res){
  Attractions.find( function(error, todos){
  	    console.log(todos);
  	res.render('index', { title: 'ToDo List with Mongoose and Express', h1: 'ToDo List', todos: todos});
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
