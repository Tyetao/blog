var mongoose = require('mongoose');
var User = require('../models/user.js');

//注册
exports.signup = function(req, res) {
    var signup = req.body.signup;

    console.log(signup.userName)
    User.findOne({ userName: signup.userName }, function(err, user) {
        if (err) {
            console.log(err);
            return;
        }
        if (user) {
            res.json({
                error_code: "Y10001",
                data: "失败",
                msg: "用户名已存在"
            })
        } else {
            var _user = new User(signup);
            _user.save(function(err, data) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.json({
                    error_code: "Y10000",
                    data: "ok",
                    msg: "注册成功"
                })
            })
        }
    })
};
//登录
exports.signin = function(req, res) {
    var reqBody = req.body;
    console.log(reqBody.userName);
    if (!reqBody.userName || !reqBody.password) {
        res.json({
            error_code: "Y10001",
            data: null,
            msg: "用户名或密码不能为空"
        })
        return;
    }

    var query = User.where({ userName: reqBody.userName });

    query.findOne(function(err, data) {
        if (err) {
            res.json({
                error_code: "Y10001",
                data: null,
                msg: "户名不存在"
            })
        }

        if (data) {
            if (data.userName == reqBody.userName && data.password == reqBody.password) {
                res.json({
                    error_code: "Y10000",
                    datas: {"userName":data.userName,"userId":data._id},
                    msg: "登录成功"
                })
            } else {
                res.json({
                    error_code: "Y10001",
                    data: null,
                    msg: "用户名或密码错误"
                })
            }
        } else {
            res.json({
                error_code: "Y10001",
                data: null,
                msg: "用户名或密码错误"
            })
        }
    });
}
