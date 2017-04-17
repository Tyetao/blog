var mongoose = require('mongoose');
var User = require('../models/user.js');

//新增账号
exports.addUser = function(req, res) {
    var reqBody = req.body;

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
            console.log(err);
            return;
        }

        if (data) {
            res.json({
                error_code: "Y10001",
                data: null,
                msg: data.userName + "用户名已存在"
            })
        } else {
            var _user = new User(reqBody);
            _user.save(function(err, data) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.json({
                    error_code: "Y10000",
                    data: "ok",
                    msg: "添加成功"
                })
            })
        }
    });
};
//账号列表
exports.getUserList = function(req, res) {
    User.find(function(err, datas) {
        if (err) {
            res.json({
                error_code: 'Y99999',
                data: err,
                msg: '查询失败'
            })
        }

        res.json({
            error_code: 'Y10000',
            data: datas,
            msg: '查询成功'
        })
    })
};
//删除账号
exports.removeUser = function(req, res) {
    var id = req.body.id;
    if (id) {
        User.remove({_id: id}, function(err, datas){
            if (err) {
                res.json({
                    error_code: "Y10001",
                    data: err,
                    msg: "删除失败"
                })
            }

            res.json({
                error_code: "Y10000",
                data: datas,
                msg: "删除成功"
            })
        })
    }
}
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
            console.log(err);
            return;
        }

        if (data) {
            if (data.userName == reqBody.userName && data.password == reqBody.password) {
                res.json({
                    error_code: "Y10000",
                    datas: data.userName,
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
