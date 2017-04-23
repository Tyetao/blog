var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10
var userSchema = new Schema({
    userName: {
        unqiue: true,
        type: String
    },
    password: String,
    sex: {
        type: Number,
        default: 0
    },
    role: {
        type: Number,
        default: 2
    },
    date: {
        create: {
            type: Date,
            default: Date.now()
        },
        update: {
            type: Date,
            default: Date.now()
        }
    }
});

userSchema.pre('save', function(next) {
    // var user = this

    if (this.isNew) {
        this.date.create = this.date.update = Date.now()
    } else {
        this.date.update = Date.now()
    }
    next()
    // bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    //     if (err) return next(err)

    //     bcrypt.hash(user.password, salt, function(err, hash) {
    //         if (err) return next(err)

    //         user.password = hash
    //         next()
    //     })
    // })
})

userSchema.statics = {
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
module.exports = userSchema;
