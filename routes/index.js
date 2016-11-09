var express = require('express');
var router = express.Router();
var session = require('express-session');
var assert = require('assert');
var util = require('./utils/util');

// 通过entity查询数据
router.get('/query', function (req, res) {
  var data1 = {
    apkName: "files.file_data.name",
    apkPath: "files.file_data.path",
    apkSize: 12315,
    versionName: "String",
    packageName: "String",
    versionCode: 201602,
    launchableActivity: "String"
  };
  var ApkListEntity = new util.ApkListModel(data1);
  console.log(data1);
  ApkListEntity.save(function (err) {
    console.log(err);
  });
  res.render('index', { title: '首页', is_login: true, username: null});
});

// 通过entity保存数据
router.get('/save', function (req, res) {
    util.saveData({username: "jimmy2", password: "qq123456"});
    res.render('index', { title: '首页', is_login: true, username: null});
});

// 通过entity更新数据
router.get('/update', function (req, res) {
    util.updateData({username: 'jimmy2'}, 'username', 'jimmy_updated');
    res.render('index', { title: '首页', is_login: true, username: null});
});

// 通过model删除数据
router.get('/del', function (req, res) {
    util.delData({username: 'jimmy_updated',password:'qq123456'});
    res.render('index', { title: '首页', is_login: true, username: null});
});

/* GET home page. */
router.get('/', function(req, res) {
    if (req.session.user) {
        res.render('index', { title: '首页', is_login: true, username: req.session.user.username});
    }else{
        res.render('index', { title: '首页', is_login: false, username: null})
    }
});

/* GET apiTest page. */
router.get('/apiRecordTest', function(req, res) {
  console.log(req.query.result);
    if  (!req.query.Iter) {
      util.ApiRecordResultModel.find({},{"Iter": 1, "_id": 0}, function (err, docs) {
        if (err) return handleError(err);
        req.query.Iter = docs[0].Iter;
        util.ApiRecordResultModel.count({"Iter":req.query.Iter}, function (err, docs) {
          if (err) return handleError(err);
          var totalCount = docs;
          util.ApiRecordResultModel.count({"Iter":req.query.Iter,"result":"Pass"}, function (err, docs) {
            if (err) return handleError(err);
            var passCount = docs;
            util.ApiRecordResultModel.count({"Iter":req.query.Iter,"result":"Fail"}, function (err, docs) {
              if (err) return handleError(err);
              var failCount = docs;
              util.ApiRecordResultModel.count({"Iter":req.query.Iter,"result":"Exception"}, function (err, docs) {
                if (err) return handleError(err);
                var exceptionCount = docs;
                // util.ApiRecordResultModel.find({"Iter":req.query.Iter})
                if (req.session.user) {
                    res.render('apiRecordTest', { title: '接口回放测试结果页',
                                                  Iter: req.query.Iter,
                                                  is_login: true,
                                                  totalCount: totalCount,
                                                  passCount: passCount,
                                                  failCount: failCount,
                                                  exceptionCount: exceptionCount,
                                                  username: req.session.user.username});
                }else{
                    req.session.error = "请先登录";
                    req.session.frompage = "from=apiRecordTest";
                    res.redirect("/login?"+req.session.frompage);
                }
              });
            });
          });
        });
      }).sort({Iter: -1}).limit(1);
    } else {
      util.ApiRecordResultModel.count({"Iter":req.query.Iter}, function (err, docs) {
        if (err) return handleError(err);
        var totalCount = docs;
        // console.log(docs);
        // console.log(req.query.Iter);
        util.ApiRecordResultModel.count({"Iter":req.query.Iter,"result":"Pass"}, function (err, docs) {
          if (err) return handleError(err);
          var passCount = docs;
          util.ApiRecordResultModel.count({"Iter":req.query.Iter,"result":"Fail"}, function (err, docs) {
            if (err) return handleError(err);
            var failCount = docs;
            util.ApiRecordResultModel.count({"Iter":req.query.Iter,"result":"Exception"}, function (err, docs) {
              if (err) return handleError(err);
              var exceptionCount = docs;
              if (req.session.user) {
                  res.render('apiRecordTest', { title: '接口回放测试结果页',
                                                Iter: req.query.Iter,
                                                is_login: true,
                                                totalCount: totalCount,
                                                passCount: passCount,
                                                failCount: failCount,
                                                exceptionCount: exceptionCount,
                                                username: req.session.user.username});
              }else{
                  req.session.error = "请先登录";
                  req.session.frompage = "from=apiRecordTest";
                  res.redirect("/login?"+req.session.frompage);
              }
            });
          });
        });
      });
    };
});

/* GET login page. */
router.get('/login', function(req, res) {
    // console.log(req.session.error)
    // if (!req.session.frompage) {
    //   req.session.frompage = "/"
    // }
    res.render('login', { title: 'login'});
});

/* GET logout page. */
router.get('/logout', function(req, res) {
    req.session.user = null;
    req.session.error = null;
    res.render('logout', { title: 'logout' });
});

/* GET home page. */
router.get('/home', function(req, res) {
    if (req.session.user) {
        res.render('home', { title: '后台添加页' });
    }else{
        req.session.error = "请先登录";
        req.session.frompage = "from=home";
        res.redirect("/login?"+req.session.frompage);
        // res.send(404)
    }
});

/* GET register page. */
router.get('/register', function(req, res) {
    res.redirect("/login");
});

/* POST login API. */
router.post('/api/login', function(req, res) {
      util.UsersModel.findOne({username:req.body.username,password:req.body.password}, function (err, docs) {
        if (docs) {
          console.log("login ok");
          req.session.user = {username:req.body.username,password:req.body.password};
          res.send({ 
            message: '登录成功', 
            success: true, 
            username: req.body.username
          });
        } else {
          console.log("login fail");
          req.session.error = "用户名或者密码不正确";
          res.send({ 
            message: '登录失败', 
            success: false, 
            username: null
          });
        }
      });
});

/* GET 1.html */
router.get('/htmlDemo', function (req, res) {
  console.log("1.html get");
  res.sendfile('1.html');
  // body...
});


/* GET detail page. */
router.get('/detail', function(req, res) {
    res.render('detail', { title: '详情页' });
});

/* GET list page. */
router.get('/admin/list', function(req, res) {
    res.render('list', { title: '后台列表页' });
});



/*hompage*/
router.post('/homepage', function(req, res) {
	var query_doc = {userid: req.body.userid, password: req.body.password};
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  findRestaurants(db, query_doc, function(is_ok){
	  	db.close();
	  	console.log(is_ok)
	  	if (is_ok == "ok") {
	  		console.log(is_ok);
	  		console.log("login pass");
	  		res.render('homepage', { title: 'logout' });
	  	} else {
	  		console.log("login error");
	  		res.render('login_error', { message: 'login fail! userid or password error'});
	  	}	
	  });
	  console.log("Connected correctly to server.");
	});
});

module.exports = router;