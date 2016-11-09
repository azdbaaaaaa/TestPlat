var mongoose = require('mongoose');
var db_data = mongoose.connect("mongodb://localhost:27017/data");

// 定义UsersSchema & UsersModel
var UsersSchema = new mongoose.Schema({
      username: String,   //定义一个属性name，类型为String
      password: String
    });
var UsersModel = db_data.model('user', UsersSchema);

// 定义ApkListSchema & ApkListModel
var ApkListSchema = new mongoose.Schema({
	apkName: String,
	apkPath: String,
	apkSize: Number,
	versionName: String,
	packageName: String,
	versionCode: Number,
	launchableActivity: String,
	uploadTime: Number
});
var ApkListModel = db_data.model('apklist', ApkListSchema);

// 定义ApiRecordResultSchema & ApiRecordResultModel
var ApiRecordResultSchema = new mongoose.Schema({
      origin: Object,   //定义一个属性name，类型为String
      Iter: Number,
      created: Number,
      requests: Object,
      updated: Number,
      result: String,
      desc: String
    });
var ApiRecordResultModel = db_data.model('record', ApiRecordResultSchema);


exports.UsersModel = UsersModel;
exports.ApkListModel = ApkListModel;
exports.ApiRecordResultModel = ApiRecordResultModel;

exports.queryData = function (data) {
	UsersModel.findOne(data, function (err, docs) {
		if (err) return handleError(err);
		console.log(docs);
		return docs;
	});
};

exports.saveData = function (data) {
	var entity = new UsersModel(data);
	entity.save(function(err){
		if (err) return handleError(err);
		return true;
	});
};

exports.updateData = function (data, update_key, update_value) {
	UsersModel.findOne(data,function(err,docs){
		if (err) return handleError(err);
		if (docs !== null) {
			docs[update_key] = update_value;
			docs.save(function(err){
				if (err) return handleError(err);
				return true;
			});
		} else {
			return false;
		};
    });
};

exports.delData = function (data) {
	UsersModel.findOne(data,function(err,docs){
		if (err) return handleError(err);
		if (docs !== null) {
			docs.remove(function(err){
				if (err) return handleError(err);
				return true;
			});
		} else {
			return false;
		};
    });
};

function execCmd(cmdStr, callback) {
	var exec = require('child_process').exec; 
	exec(cmdStr, function(err,stdout,stderr){
		if (err) {
			callback(err);
			return;
		};
		if (stderr) {
			callback(stderr);
			return;
		};
		if (stdout) {
			callback(null, stdout);
			return;
			// return stdout;
		};
	});
};

exports.getApkInfo_packageName = function (apkPath) {
	var exec = require('child_process').exec; 
	var getPacknameStr = 'aapt dump badging ' + apkPath + ' grep package | head -n 1 | cut -d "\'" -f 2 | tr -d \'\\n\'';
	return execCmd(getPacknameStr);
};

exports.getApkInfo_aapt = function (apkPath, callback) {
	var exec = require('child_process').exec; 
	var getPacknameStr = 'aapt dump badging ' + apkPath + ' | grep package | head -n 1 | cut -d "\'" -f 2 | tr -d \'\\n\'';
	var getVersionCodeStr = 'aapt dump badging ' + apkPath + ' | grep package | head -n 1 | cut -d "\'" -f 4 | tr -d \'\\n\'';
	var getVersionNameStr = 'aapt dump badging ' + apkPath + ' | grep package | head -n 1 | cut -d "\'" -f 6 | tr -d \'\\n\'';
	var getLaunchableActivityStr = 'aapt dump badging ' + apkPath + ' | grep launchable-activity | head -n 1 | cut -d "\'" -f 2 | tr -d \'\\n\''
	var result = {};
	execCmd(getPacknameStr,function (err, doc) {
		result.packageName = doc;
		execCmd(getVersionCodeStr,function (err, doc) {
			result.versionCode = doc;
			execCmd(getVersionNameStr,function (err, doc) {
				result.versionName = doc;
				execCmd(getLaunchableActivityStr, function (err, doc) {
					result.launchableActivity = doc
					callback(result);
					return;
				})
			});
		});
	});
};

// function saveData(Model, data) {
// 	var entity = new Model(data);
//  entity.save();
// };

// function updateData(Model, data, data_after) {
// 	Model.findOne(data,function(err,user){
//       if (err == null && user !== null) {
//         user.username = 'jimmy_updated';
//         user.save(function(err){});
//       } else {
//         console.log(err)
//       }
//     });
// };

// // 通过entity保存数据
// router.get('/save', function (req, res) {
//     var UsersEntity = new UsersModel({username:'jimmy2',password:'qq123456'});
//     console.log(UsersEntity.username);
//     UsersEntity.save();
//     res.render('index', { title: '首页', is_login: true, username: null});
// });

// // 通过entity更新数据
// router.get('/update', function (req, res) {
//     UsersModel.findOne({username: 'jimmy2'},function(err,user){
//       if (err == null && user !== null) {
//         console.log(err);
//         console.log(user);
//         user.username = 'jimmy_updated';
//         user.save(function(err){});
//       } else {
//         console.log(err)
//       }
//     });
//     res.render('index', { title: '首页', is_login: true, username: null});
// });

// // 通过Model删除数据
// router.get('/del', function (req, res) {
//     UsersModel.findOne({username: 'jimmy_updated',password:'qq123456'},function(err,user){
//       if (err == null && user !== null) {
//         console.log(err);
//         console.log(user);
//         user.remove(function(err){});
//       } else {
//         console.log(err);
//       }
//     });
//     // var UsersEntity = new UsersModel({username:'jimmy_updated'});
//     // console.log(UsersEntity);
//     // UsersEntity.remove(function(err){console.log("remove pass")});
//     res.render('index', { title: '首页', is_login: true, username: null});
// });

// var flag = "hello";
// function print_flag() {
// 	console.log(flag);
// }

