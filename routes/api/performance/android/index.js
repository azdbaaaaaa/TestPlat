var express = require('express');
var router = express.Router();
var session = require('express-session');
var assert = require('assert');

// var mongoose = require('mongoose');
// var db = mongoose.connect("mongodb://localhost:27017/data");
// var UsersSchema = new mongoose.Schema({
//       // username: String,   //定义一个属性name，类型为String
//       password: String
//     });
// var UsersModel = db.model('Users', UsersSchema);

/* POST apk file */
router.post('/uploadApk', function(req, res) {
	// model_users.find({},function(err,docs){
	// 	console.log(docs);
	// });
	res.send({
	    message: '上传成功',
	    success: true,
	});
});

/* GET apk list */
router.get('/getApkList', function(req, res) {
	res.send({
	    message: '获取成功',
	    success: true,
	    data: {
	    		'list': ['a.apk', 'b.apk', 'c.apk'], 
	    		'detail': {'size': '9.87M', 'packageName': 'com.yaya.mmbang', 'versionCode': '20160720', 'versionName': '3.11.4', 'launchableActivity': 'com.yaya.mmbang.activity.SplashActivity'}
	    	},
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