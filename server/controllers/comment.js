var mongoose = require('mongoose')
var Comment = require('../models/comment.js');

// comment
exports.commentSave = function(req, res) {
    var _comment = JSON.parse(req.body.comment)
    if (_comment.cid) {
        console.log(_comment.cid)
        Comment.findById(_comment.cid, function(err, comment) {
            var reply = {
                from: _comment.from,
                to: _comment.tid,
                content: _comment.content,
                createAt: Date.now()
            }

            comment.reply.push(reply);

            comment.save(function(err, comment) {
                if (err) {
                    console.log(err)
                    return;
                }
                res.json({
                    error_code: "Y10000",
                    datas: comment,
                    msg: "操作成功"
                })
            })
        });
    }else{
        console.log(2)
        var comment = new Comment(_comment)

        comment.save(function(err, comment) {
            if (err) {
                console.log(err)
                return;
            }
            res.json({
                error_code: "Y10000",
                datas: comment,
                msg: "操作成功"
            })
        })
    }

}
