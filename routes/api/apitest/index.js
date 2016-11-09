var express = require('express');
var router = express.Router();
var session = require('express-session');
var assert = require('assert');
var formidable = require('formidable');
var util = require('../../utils/util');
var fs = require('fs');

/* POST apk file */
// router.post('/uploadApk', function(req, res) {
// 	// console.log(req.multipart);
// 	//创建表单上传
//     var form = new formidable.IncomingForm();
//     //设置编辑
//     form.encoding = 'utf-8';
//     //设置文件存储路径
//     form.uploadDir = "../packages/apks/";
//     //保留后缀
//     form.keepExtensions = true;
//     //设置单文件大小限制    
//     form.maxFieldsSize = 50 * 1024 * 1024;
//     //form.maxFields = 1000;  设置所有文件的大小总和

//     form.parse(req, function(err, fields, files) {
//       // res.writeHead(200, {'content-type': 'text/plain'});
//       // res.write('received upload:\n\n');
//       // res.end(util.inspect({fields: fields, files: files}));
//       // console.log(files);
//       var data = {
//       	apkName: files.file_data.name,
//       	apkPath: files.file_data.path,
//       	apkSize: files.file_data.size,
//       	versionName: "",
//       	packageName: "",
//       	versionCode: 0,
//       	launchableActivity: "",
//       	uploadTime: 0,
//       };
//       util.getApkInfo_aapt(data.apkPath, function (docs) {
//       	data.packageName = docs.packageName;
//       	data.versionCode = docs.versionCode;
//       	data.versionName = docs.versionName;
//       	data.launchableActivity = docs.launchableActivity;
//       	console.log(docs);
//       	data.uploadTime = (new Date()).valueOf();
//       	var ApkListEntity = new util.ApkListModel(data);
//       	ApkListEntity.save();
//       	res.send({message: '上传成功',success: true,data: data.launchableActivity});
//       });
//     });
// });

/* GET apiRecordResult list */
router.get('/getApiRecordResult', function(req, res) {
  if (req.query.page) {
    var skippage = (req.query.page - 1) * 20;
  } else {
    var skippage = 0;
  };
  delete req.query.page;
	util.ApiRecordResultModel.find(req.query, function (err, docs) {
		if (err) return handleError(err);
		res.send({
		    message: '获取成功',
		    success: true,
		    data: docs, 
		});
	}).sort({"id": 1});
  // .limit(skippage + 20).skip(skippage);
});

/* GET apiRecordResultSummary list */
// router.get('/getApiRecordResultSummary', function(req, res) {
//   var queryJson = req.query;
//   util.ApiRecordResultModel.find(queryJson, function (err, docs) {
//     if (err) return handleError(err);
//     var totalCount = docs.length;
//     queryJson.result = "Pass";
//     util.ApiRecordResultModel.find(queryJson, function(err, docs){
//       if (err) return handleError(err);
//       var passCount = docs.length;
//       queryJson.result = "Fail";
//       util.ApiRecordResultModel.find(queryJson, function(err, docs){
//         if (err) return handleError(err);
//         var failCount = docs.length;
//         queryJson.result = "Exception";
//         util.ApiRecordResultModel.find(queryJson, function(err, docs){
//           if (err) return handleError(err);
//           var exceptionCount = docs.length;
//           res.send({
//               message: '获取成功',
//               success: true,
//               data: {
//                 "totalCount": totalCount,
//                 "passCount": passCount,
//                 "failCount": failCount,
//                 "exceptionCount": exceptionCount
//               } 
//           });
//         });
//       });
//     });
//   }).count();
// });

module.exports = router;