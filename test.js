// var promise = new Promise(function(resolve, reject) {
//   // ... some code

//   if (/* 异步操作成功 */){
//     resolve(value);
//   } else {
//     reject(error);
//   }
// });

// promise.then(function(value) {
//   // success
// }, function(error) {
//   // failure
// });

// var t = 1476243675345.0;
// // var t_f = t.Format("yyyy-MM-dd ");
// // console.log(t_f);

// var unixTimestamp = new Date(t);
// commonTime = unixTimestamp.toLocaleString();
// console.log(commonTime);
// console.log((new Date(1476243675345.0)).toLocaleString());

// var mongoose = require('mongoose');
// var db_data = mongoose.connect("mongodb://localhost:27017/data");
// // 定义ApiReplysummarySchema & ApiReplysummaryModel
// var ApiReplysummarySchema = new mongoose.Schema({
//       start: Number,
//       end: Number,
//       Iter: Number,
//       totalCount: Number,
//       passCount: Number,
//       failCount: Number,
//       exceptionCount: Number
//     });
// var ApiReplysummaryModel = db_data.model('apireplysummarys', ApiReplysummarySchema);
// // // 定义ApiRecordResultSchema & ApiRecordResultModel
// // var ApiRecordResultSchema = new mongoose.Schema({
// //       origin: Object,   //定义一个属性name，类型为String
// //       id: Number,
// //       Iter: Number,
// //       created: Number,
// //       requests: Object,
// //       updated: Number,
// //       result: String,
// //       desc: String
// //     });
// // var ApiRecordResultModel = db_data.model('apireplysummarys', ApiRecordResultSchema);

// ApiReplysummaryModel.find({}, function (err, docs) {
// 	// console.log(err);
// 	console.log(docs);
// });
console.log(111);
var exec = require('child_process').exec,
  // last = exec('touch 2.txt');
  last = exec('python C:\\Users\\zhoudonbin\\Documents\\GitHub\\RequestRecord\\reply.py -i C:\\Users\\zhoudonbin\\Documents\\GitHub\\RequestRecord\\test01.log');

last.on('exit', function (code) {
	console.log(22);
});