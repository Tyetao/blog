var mongoose = require('mongoose');
var Article = require('../models/article.js');
var Comment = require('../models/comment.js');
var User = require('../models/user.js');
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
        .find({ "articleType": query }, function(err, counts) {
            if (err) {
                res.json({
                    error_code: "Y99999",
                    datas: err,
                    msg: "查询失败"
                })
            }
            Article
                .find({ "articleType": query })
                .skip(rows)
                .limit(count)
                .sort('-create')
                .exec(function(err, data) {
                    if (err) {
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
                res.json({
                    error_code: "Y99999",
                    datas: err,
                    msg: "查询详情失败"
                })
            }
            
            Article
                .find({ "create": { $lt: data.create } })
                .limit(1)
                .exec(function(err, prveArticle) {
                    if (err) {
                        res.json({
                            error_code: "Y99999",
                            datas: err,
                            msg: "查询上一篇失败"
                        })
                    }
                    Article
                        .find({ "create": { $gt: data.create } })
                        .limit(1)
                        .exec(function(err, nextArticle) {
                            if (err) {
                                res.json({
                                    error_code: "Y99999",
                                    datas: err,
                                    msg: "查询下一篇失败"
                                })
                            }
                            Comment
                                .find({article:id})
                                .populate('from','userName')
                                .exec(function(err, comments){
                                    if (err) {
                                        res.json({
                                            error_code: "Y99999",
                                            datas: err,
                                            msg: "查询评论失败"
                                        })
                                    }
                                    res.json({
                                        error_code: "Y10000",
                                        datas: {
                                            article: data,
                                            prveArticle: prveArticle,
                                            nextArticle: nextArticle,
                                            comments: comments
                                        },
                                        msg: "查询成功"
                                    })
                                })
                        })
                })
        });
    }
};
