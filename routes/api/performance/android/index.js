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
      	launchableActivity: ""
      };
      util.getApkInfo(data.apkPath, function (docs) {
      	data.packageName = docs.packageName;
      	data.versionCode = docs.versionCode;
      	data.versionName = docs.versionName;
      	var ApkListEntity = new util.ApkListModel(data);
      	ApkListEntity.save();
      	// console.log(parseFloat(files.file_data.size/1024/1024).toFixed(2) + "MB");
      	res.send({message: '上传成功',success: true,});
      });
    });
});

/* GET apk list */
router.get('/getApkList', function(req, res) {
	util.ApkListModel.find({},{"apkName":1,"_id":0}, function (err, docs) {
		if (err) return handleError(err);
		// console.log(docs);
		var apkList = [];
		for (var i = 0; i < docs.length; i++) {
			apkList.push(docs[i].apkName);
			// console.log(docs[i].apkName);
		};
		console.log(apkList);
		res.send({
		    message: '获取成功',
		    success: true,
		    data: {
		    		'list': apkList, 
		    		'detail': {'size': docs[0].apkSize, 'packageName': docs[0].packageName, 'versionCode': docs[0].versionCode, 'versionName': docs[0].versionName, 'launchableActivity': docs[0].launchableActivity}
		    	},
		});
	});
});

/* GET apk Info */
router.get('/getApkInfo', function(req, res) {
	console.log(req.query.apkName);
	if (req.query.apkName == 'a.apk') {
		res.send({
		message: '获取成功',
	    success: true,
	    data: {
	    	'size': '8.87M',
	    	'packageName': 'com.yaya.mmbang',
	    	'versionCode': '20160720', 
	    	'versionName': '3.11.4', 
	    	'launchableActivity': 'com.yaya.mmbang.activity.SplashActivity'}
		})	
	}else{
		res.send({
		message: '获取成功',
	    success: true,
	    data: {
	    	'size': '10.87M', 
	    	'packageName': 'com.yaya.mmbang', 
	    	'versionCode': '20160720', 
	    	'versionName': '3.11.4', 
	    	'launchableActivity': 'com.yaya.mmbang.activity.SplashActivity'}
		});
	}
	
});

/* GET device list */
router.get('/getDeviceList', function(req, res) {
  res.send({
    message: '获取成功',
    success: true,
    data: {
    	'list': ['xiaomi note plus', 'vivo Y27', 'vivo X3T'],
    	'detail': {
    		'phoneAPIVersion': 'API16',
    		'phoneBrand': 'xiaomi-1',
    		'phoneModel': 'model-1'
    	},
    }, 
  });
});

/* GET device Info */
router.get('/getDeviceInfo', function (req, res) {
	res.send({
    message: '获取成功',
    success: true,
    data: {
    	'phoneAPIVersion': 'API17',
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