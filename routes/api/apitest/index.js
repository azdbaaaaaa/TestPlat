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
        // console.log(Iter);
        // console.log(result);
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
        // console.log(Iter);
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
      // console.log(docs);
      res.send({
        message: '获取成功',
        success: true,
        data: docs, 
      });
    }).sort({"Iter": -1});
});

/* GET apiRecordResultSummary list */
router.get('/runApiReply', function(req, res) {
  console.log('running api reply...');
  // res.send('running api reply...');
  var exec = require('child_process').exec,
      // last = exec('ls -al');
      last = exec('python C:\\Users\\zhoudonbin\\Documents\\GitHub\\RequestRecord\\reply.py -i C:\\Users\\zhoudonbin\\Documents\\GitHub\\RequestRecord\\test01.log');

  last.on('exit', function (code) {
    if (code == 0) {
      res.send({"message":"执行成功", success: true})
    } else {
      res.send({"message":"执行失败，请重试", success: false});
    }
  });
});

/* POST sqlmap file */
router.post('/uploadSqlmapFile', function(req, res) {
  // console.log(req.multipart);
  //创建表单上传
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "../Files/sqlmaps/";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制    
    form.maxFieldsSize = 50 * 1024 * 1024;
    //form.maxFields = 1000;  设置所有文件的大小总和

    form.parse(req, function(err, fields, files) {
      // res.writeHead(200, {'content-type': 'text/plain'});
      // res.write('received upload:\n\n');
      // res.end(util.inspect({fields: fields, files: files}));
      // console.log(files);
      var data = {
        apkName: files.file_data.name,
        apkPath: files.file_data.path,
        apkSize: files.file_data.size,
      };
      res.send({message: '上传成功', success: true});
    });
});

module.exports = router;