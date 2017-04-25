var express = require('express');
var path = require('path');
var db = require('./config/config.js');
var bodyParser = require('body-parser'); //处理请求体数据
var cookieParser = require('cookie-parser');
var history = require('connect-history-api-fallback');

var session = require('express-session');
var mongoStore = require('connect-mongo')(session);//mogondb持久化ssesion
var morgan = require('morgan'); //node.js的HTTP请求记录器中间件
var app = express();
app.use(history());
app.use(morgan('tiny'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('./dist'));

/*跨域访问*/
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By","3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
}); 

var routes = require('./server/routes/routes.js')(app);//路由API

var server = app.listen(8888, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
