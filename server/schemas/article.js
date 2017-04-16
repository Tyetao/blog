var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var articleSchema = new Schema({
    articleType: String,
    type: String,
    articleName: String,
    articleAuthor: String,
    articleLink: String,
    articleDes: String,
    imgUrl: String,
    content: String,
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

module.exports = articleSchema;
