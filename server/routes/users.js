var express = require('express');
var router = express.Router();
var User = require('./../models/user');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//登录接口
router.post("/login", function (req, res, next) {
    let param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    };
    User.findOne(param, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            });
        } else {
            if (doc) {
                //存入cookie
                res.cookie("userId", doc.userId, {
                    //设置存放cookie至根目录
                    path: "/",
                    //设置cookie存放周期
                    maxAge:1000*60*60//一小时
                });
                //存入session
                // req.session.user = doc;
                res.json({
                    status: "0",
                    msg: "",
                    result: {
                        userName: doc.userName,
                    }
                })
            }
        }
    })
});
module.exports = router;
