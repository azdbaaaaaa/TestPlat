var express = require('express');
var router = express.Router();
var session = require('express-session');
var assert = require('assert');


var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/data';
// var ObjectId = require('mongodb').ObjectId;

var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost:27017/data");
var UsersSchema = new mongoose.Schema({
      // username: String,   //定义一个属性name，类型为String
      password: String
    });
var UsersModel = db.model('Users', UsersSchema);

/* GET home page. */
router.get('/', function(req, res) {
    console.log(11111111);
    if (req.session.user) {
        res.render('index', { title: '首页', is_login: true, username: req.session.user.username});
    }else{
        res.render('index', { title: '首页', is_login: false, username: null})
    }
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
        req.session.frompage = "home";
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

    UsersModel.find({username:req.body.username,password:req.body.password},function(err,docs){
      console.log(docs.length);
      if (docs.length > 0) {
          console.log("login ok");
          req.session.user = {username:req.body.username,password:req.body.password};
          res.send({ 
            message: '登录成功', 
            success: true, 
            username: req.body.username
          });
      }else{
          console.log("login fail");
          req.session.error = "用户名或者密码不正确";
          res.send({ 
            message: '登录失败,用户名或者密码不正确', 
            success: false, 
            username: null
          });
      };
    });

    // var user={
    //         username:'admin',
    //         password:'admin'
    //    }
    // // console.log("req.body.username")
    // if(req.body.username==user.username&&req.body.password==user.password){
    //     req.session.user = user;
    //     // res.redirect("/home", { title: '登录成功页' , username: req.body.username})
    //     res.send({ title: '登录成功页' , username: req.body.username});
    //     // res.render('home', { title: '登录成功页' , username: req.body.username});
    //   }else{
    //     req.session.error = "用户名或者密码不正确";
    //     res.send(404);
    //     // res.redirect("/login", { message: "error" });
    //   }
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

// {
// "cid":{$in: [
//      "fd24a8ddafb0c6accbae66f71745469c" 
//   ]}
// }