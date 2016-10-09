var mongoose = require('mongoose');
var db_data = mongoose.connect("mongodb://localhost:27017/data");

var UsersSchema = new mongoose.Schema({
      username: String,   //定义一个属性name，类型为String
      password: String
    });
var UsersModal = db_data.model('Users', UsersSchema);


function saveData(modal, data) {
	var entity = new modal(data);
    entity.save();
};

function updateData(modal, data, data_after) {
	modal.findOne(data,function(err,user){
      if (err == null && user !== null) {
        user.username = 'jimmy_updated';
        user.save(function(err){});
      } else {
        console.log(err)
      }
    });
};

// 通过entity保存数据
router.get('/save', function (req, res) {
    var UsersEntity = new UsersModal({username:'jimmy2',password:'qq123456'});
    console.log(UsersEntity.username);
    UsersEntity.save();
    res.render('index', { title: '首页', is_login: true, username: null});
});

// 通过entity更新数据
router.get('/update', function (req, res) {
    UsersModal.findOne({username: 'jimmy2'},function(err,user){
      if (err == null && user !== null) {
        console.log(err);
        console.log(user);
        user.username = 'jimmy_updated';
        user.save(function(err){});
      } else {
        console.log(err)
      }
    });
    res.render('index', { title: '首页', is_login: true, username: null});
});

// 通过modal删除数据
router.get('/del', function (req, res) {
    UsersModal.findOne({username: 'jimmy_updated',password:'qq123456'},function(err,user){
      if (err == null && user !== null) {
        console.log(err);
        console.log(user);
        user.remove(function(err){});
      } else {
        console.log(err);
      }
    });
    // var UsersEntity = new UsersModal({username:'jimmy_updated'});
    // console.log(UsersEntity);
    // UsersEntity.remove(function(err){console.log("remove pass")});
    res.render('index', { title: '首页', is_login: true, username: null});
});


exports.mongoose = mongoose;