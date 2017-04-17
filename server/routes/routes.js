var Article = require('../controllers/article.js');
var Comment = require('../controllers/comment.js');
var User = require('../controllers/user.js');

var multipart = require('connect-multiparty'); //上传文件中间件
var multipartMiddleware = multipart();

module.exports = function(app){

	app.post('/list',Article.list); //文章列表
	app.post('/articleDatile',Article.articleDatile); //文章详情

	app.post('/commentSave',Comment.commentSave);

	app.post('/addUser',User.addUser)
}