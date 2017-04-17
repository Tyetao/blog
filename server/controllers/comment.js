var mongoose = require('mongoose')
var Comment = require('../models/comment.js');

// comment
exports.commentSave = function(req, res) {
    var _comment = JSON.parse(req.body.comment)

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
