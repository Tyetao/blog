var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CommentSchema = new Schema({
    imgUrl: { type: Schema.Types.ObjectId, ref: 'user' },
    article: { type: Schema.Types.ObjectId, ref: 'article' },
    from: { type: Schema.Types.ObjectId, ref: 'user' },
    reply: [{
        imgUrl: { type: Schema.Types.ObjectId, ref: 'user' },
        from: { type: Schema.Types.ObjectId, ref: 'user' },
        to: { type: Schema.Types.ObjectId, ref: 'user' },
        content: String,
        createAt: Date
    }],
    content: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

CommentSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next()
})

CommentSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({ _id: id })
            .exec(cb)
    }
}

module.exports = CommentSchema
