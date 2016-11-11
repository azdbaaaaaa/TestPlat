var express = require('express');
var router = express.Router();
var session = require('express-session');
var assert = require('assert');
var formidable = require('formidable');
var util = require('../../utils/util');
var fs = require('fs');

/* GET getApiReplyRecord list */
router.get('/getApiReplyRecord', function(req, res) {
	// if (req.query.page) {
	// var skippage = (req.query.page - 1) * 20;
	// } else {
	// var skippage = 0;
	// };
 //  	delete req.query.page;
  	if (req.query.Iter) {
  		var Iter = req.query.Iter; 
  		if (req.query.result) {
  			var result = req.query.result;
        console.log(Iter);
        console.log(result);
        // util.UsersModel.find({username:"jimmy",password:"qq123456"}, function (err, docs) {
        //   console.log(docs);
        // });
  			util.ApiReplyRecordModel.find({"Iter": Iter, "result": result}, function (err, docs) {
  				if (err) return handleError(err);
  				res.send({
  				    message: '获取成功',
  				    success: true,
  				    data: docs, 
  				});
  			}).sort({"id": 1});
  		} else {
        console.log(Iter);
  			util.ApiReplyRecordModel.find({"Iter": Iter}, function (err, docs) {
  				if (err) return handleError(err);
  				res.send({
  				    message: '获取成功',
  				    success: true,
  				    data: docs, 
  				});
  			}).sort({"id": 1});
  		};
  	} else {
  		res.send({
		    message: '参错错误',
		    success: false,
  		});
  	};
  // .limit(skippage + 20).skip(skippage);
});

/* GET apiRecordResultSummary list */
router.get('/getApiReplySummary', function(req, res) {
    util.ApiReplysummaryModel.find({}, function (err, docs){
      if (err) return handleError(err);
      console.log(docs);
      res.send({
        message: '获取成功',
        success: true,
        data: docs, 
      });
    });
});

module.exports = router;