var Article = require('../controllers/article.js');

var multipart = require('connect-multiparty'); //上传文件中间件
var multipartMiddleware = multipart();

module.exports = function(app){

	app.post('/list',Article.list); //文章列表
	app.post('/articleDatile',Article.articleDatile); //文章详情
}