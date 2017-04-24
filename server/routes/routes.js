var Article = require('../controllers/article.js');
var Comment = require('../controllers/comment.js');
var User = require('../controllers/user.js');

var multipart = require('connect-multiparty'); //上传文件中间件
var multipartMiddleware = multipart();

module.exports = function(app){

	app.post('/api/list',Article.list); //文章列表
	app.post('/api/articleDatile',Article.articleDatile); //文章详情
	app.get('/api/recentArticle', Article.recentArticle);//近期文章
    app.get('/api/articleClassify', Article.articleClassify);//文章分类
	app.get('/api/clickRate', Article.clickRate);//点击率

	app.post('/api/commentSave',Comment.commentSave); //保存评论

	app.post('/api/signin',User.signin) //登录
	app.post('/api/signup',User.signup) //注册
}