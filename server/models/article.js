var mongoose = require('mongoose');
var articleSchema = require('../schemas/article.js');
var Article = mongoose.model('article',articleSchema);

module.exports = Article;
