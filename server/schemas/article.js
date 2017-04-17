var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var articleSchema = new Schema({
    articleType: String,
    articleName: String,
    articleAuthor: String,
    articleLink: String,
    articleDes: String,
    imgUrl: String,
    content: String,
    clickRate: {
        type: Number,
        default: 0
    },
    create: Date,
    update: Date
});
    
module.exports = articleSchema;
