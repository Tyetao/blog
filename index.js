var express = require('express');
var path = require('path');
var db = require('./config/config.js');
var bodyParser = require('body-parser'); //处理请求体数据
var cookieParser = require('cookie-parser');

var session = require('express-session');
var mongoStore = require('connect-mongo')(session);//mogondb持久化ssesion
var morgan = require('morgan'); //node.js的HTTP请求记录器中间件

var app = express();
app.use(morgan('tiny'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use(express.static('./client'));


var routes = require('./server/routes/routes.js')(app);//路由API

var server = app.listen(3006, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
