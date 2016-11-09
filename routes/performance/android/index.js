var express = require('express');
var router = express.Router();
var session = require('express-session');
var assert = require('assert');

/* GET home page. */
router.get('/performance/android', function(req, res) {
    if (req.session.user) {
        res.render('performance/android/index', { title: '报告页', is_login: true, username: req.session.user.username});
    }else{
        req.session.error = "请先登录";
        req.session.frompage = "from=performance/android";
        res.redirect("/login?"+req.session.frompage);
        // res.send(404)
    }
});

/* GET home page. */
router.get('/performance/android/report', function(req, res) {
    if (req.session.user) {
        res.render('performance/android/report', { title: '报告页', is_login: true, username: req.session.user.username});
    }else{
        req.session.error = "请先登录";
        req.session.frompage = "from=performance/android/report";
        res.redirect("/login?"+req.session.frompage);
        // res.send(404)
    }
});

module.exports = router;