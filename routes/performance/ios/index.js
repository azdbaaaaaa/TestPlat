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

/* GET home page. */
router.get('/report', function(req, res) {
	if (req.session.user) {
	    res.render('report/report', { title: '报告页', is_login: true, username: req.session.user.username});
	}else{
	    req.session.error = "请先登录";
	    req.session.frompage = "report";
	    res.redirect("/login?"+req.session.frompage);
	    // res.send(404)
	}
});

module.exports = router;