var mongoose = require('mongoose');
var Article = require('../models/article.js');
var fs = require('fs');
var path = require('path');




//文章列表
exports.list = function(req, res, next) {

    var count = req.body.count;
    var page = req.body.page;
    var rows = (page - 1) * count;
    var query = req.body.query;

    if (query > 99) {
        query = { $gt: "0" };
    }


    Article
        .find({"articleType":query},function(err, counts) {
            if (err) {
                res.json({
                    error_code: "Y99999",
                    datas: err,
                    msg: "查询失败"
                })
            }
            console.log('--------------',counts.length)
            Article
                .find({"articleType":query})
                .skip(rows)
                .limit(count)
                .sort('-create')
                .exec(function(err, data) {
                    console.log(data);
                    if (err) {
                        console.log(err);
                        res.json({
                            error_code: "Y99999",
                            datas: err,
                            msg: "查询失败"
                        })
                    }

                    res.json({
                        error_code: "Y10000",
                        datas: data,
                        totalCount: counts.length,
                        msg: "查询成功"
                    })

                })
        })

};

//文章详情
exports.articleDatile = function(req, res, next) {
    var id = req.body.id;

    if (id) {
        var query = Article.where({ _id: id });

        query.findOne(function(err, data) {
            if (err) {
                console.log(err);
                return;
            }

            if (data) {
                res.json({
                    error_code: "Y10000",
                    datas: data,
                    msg: "查询成功"
                })
            }
        });
    }
};
