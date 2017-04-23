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
    console.log(req.body)
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
        Article.update({ _id: id }, { $inc: { clickRate: 1 } }, function(err) {
            if (err) {
                console.log(err);
                return;
            }
        })
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
                                .find({ article: id })
                                .populate('from', 'userName')
                                .populate('reply.from reply.to', 'userName')
                                .exec(function(err, comments) {
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

//最新文章
exports.recentArticle = function(req, res, next) {
    Article
        .find({})
        .skip(0)
        .limit(4)
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
                totalCount: data.length,
                msg: "查询成功"
            })
        })
}

//文章分类
exports.articleClassify = function(req, res, next) {
    Article
        .find(function(err, datas) {
            if (err) {
                console.log(err);
                return;
            } else {
                /**
                 *0 慢生活
                 *1 javascript
                 *2 nodejs
                 *3 angularjs
                 *4 vuejs
                 *5 mongodb
                 *6 jquery
                 *7 css3+html5
                 **/
                var javascript = [];
                var nodejs = [];
                var angularjs = [];
                var vuejs = [];
                var mongodb = [];
                var jquery = [];
                var css3html5 = [];
                for (var i = 0; i < datas.length; i++) {
                    if (datas[i].articleType == 1) {
                        javascript.push(datas[i]);
                    }
                    if (datas[i].articleType == 2) {
                        nodejs.push(datas[i]);
                    }
                    if (datas[i].articleType == 3) {
                        angularjs.push(datas[i]);
                    }
                    if (datas[i].articleType == 4) {
                        vuejs.push(datas[i]);
                    }
                    if (datas[i].articleType == 5) {
                        mongodb.push(datas[i]);
                    }
                    if (datas[i].articleType == 6) {
                        jquery.push(datas[i]);
                    }
                    if (datas[i].articleType == 7) {
                        css3html5.push(datas[i]);
                    }
                }
                var classify = [];
                if (javascript.length > 0) {
                    classify.push({
                        articleType: javascript[0].articleType,
                        articleName: 'javascript',
                        length: javascript.length
                    })
                }
                if (nodejs.length > 0) {
                    classify.push({
                        articleType: nodejs[0].articleType,
                        articleName: 'nodejs',
                        length: nodejs.length
                    })
                }
                if (angularjs.length > 0) {
                    classify.push({
                        articleType: angularjs[0].articleType,
                        articleName: 'angularjs',
                        length: angularjs.length
                    })
                }
                if (vuejs.length > 0) {
                    classify.push({
                        articleType: vuejs[0].articleType,
                        articleName: 'vuejs',
                        length: vuejs.length
                    })
                }
                if (mongodb.length > 0) {
                    classify.push({
                        articleType: mongodb[0].articleType,
                        articleName: 'mongodb',
                        length: mongodb.length
                    })
                }
                if (jquery.length > 0) {
                    classify.push({
                        articleType: jquery[0].articleType,
                        articleName: 'jquery',
                        length: jquery.length
                    })
                }
                if (css3html5.length > 0) {
                    classify.push({
                        articleType: css3html5[0].articleType,
                        articleName: 'css3html5',
                        length: css3html5.length
                    })
                }
                res.json({
                    error_code: "Y10000",
                    datas: classify,
                    msg: "查询分类成功"
                })
            }
        })
}
