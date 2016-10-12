var express = require('express');
var router = express.Router();
var session = require('express-session');
var assert = require('assert');
var formidable = require('formidable');
var util = require('../../../utils/util');
var fs = require('fs');

/* POST apk file */
router.post('/uploadApk', function(req, res) {
	// console.log(req.multipart);
	//创建表单上传
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "../packages/apks/";
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
      	versionName: "",
      	packageName: "",
      	versionCode: 0,
      	launchableActivity: "",
      	uploadTime: 0,
      };
      util.getApkInfo_aapt(data.apkPath, function (docs) {
      	data.packageName = docs.packageName;
      	data.versionCode = docs.versionCode;
      	data.versionName = docs.versionName;
      	data.launchableActivity = docs.launchableActivity;
      	console.log(docs);
      	data.uploadTime = (new Date()).valueOf();
      	var ApkListEntity = new util.ApkListModel(data);
      	ApkListEntity.save();
      	res.send({message: '上传成功',success: true,data: data.launchableActivity});
      });
    });
});

/* GET apk list */
router.get('/getApkList', function(req, res) {
	util.ApkListModel.find({},{"apkName":1,"_id":0}, function (err, docs) {
		if (err) return handleError(err);
		var apkList = [];
		for (var i = 0; i < docs.length; i++) {
			apkList.push(docs[i].apkName);
		};
		res.send({
		    message: '获取成功',
		    success: true,
		    data: apkList, 
		});
	}).sort({'uploadTime':-1});
});

/* GET apk Info */
router.get('/getApkInfo', function(req, res) {
	// console.log(req.query.apkName);
	util.ApkListModel.findOne({"apkName":req.query.apkName}, function (err, docs) {
		if (err) return handleError(err);
		if (docs == null) {
			res.send({
				message: '测试包不存在',
				success: false,				
			});
			return;
		};
		console.log(docs);
		res.send({
			message: '获取成功',
			success: true,
			data: {
				'apkSize': parseFloat(docs.apkSize/1024/1024).toFixed(2) + 'MB',
				'packageName': docs.packageName,
				'versionCode': docs.versionCode, 
				'versionName': docs.versionName, 
				'launchableActivity': docs.launchableActivity,
				'uploadTime': docs.uploadTime
			}
		});
	});
});

/* GET device list */
router.get('/getDeviceList', function(req, res) {
  res.send({
    message: '获取成功',
    success: true,
    data: ['xiaomi_note_pro'], 
  });
});

/* GET device Info */
router.get('/getDeviceInfo', function (req, res) {
	res.send({
    message: '获取成功',
    success: true,
    data: {
    	'phoneAPIVersion': '5.0.2',
    	'phoneBrand': 'xiaomi',
    	'phoneModel': 'model'    	
    },
  });
});

/* start test */
router.get('/startTest', function (req, res){
	res.send({
		message: '开始测试',
		seccess: true,
		data: {
			test_plan: 'monkey',
			test_platform: 'android'
		}
	});
});

module.exports = router;