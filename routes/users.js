var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/data';
// var ObjectId = require('mongodb').ObjectId;

// var findRestaurants = function(db, callback) {
//    var cursor =db.collection('users').find( { "borough": "Manhattan1" } );
//    cursor.each(function(err, doc) {
//       assert.equal(err, null);
//       if (doc != null) {
//          console.dir(doc);
//       } else {
//          callback();
//       }
//    });
// };

var insertDocument = function(db, callback) {
   db.collection('users').insertOne( {
      "user_id":"jimmy",
      "password":"qq123456"
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the users collection.");
    callback();
  });
};

/* GET users listing. */
router.get('/', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  insertDocument(db, function(){
	  	db.close();
	  });
	  console.log("Connected correctly to server.");
	});
	res.send('respond with a resource');
});

module.exports = router;
