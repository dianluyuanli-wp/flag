var createError = require('http-errors');
var compression = require('compression');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var proxy = require('http-proxy-middleware');

var indexRouter = require('./routes/index');

var app = express();
app.use(compression());

// from wangpei
var ejs = require('ejs');

// view engine setup
//  这个单纯就是为了使用模板语法
//      <div><%- content %></div> 感觉没意义
app.engine('.html', ejs.renderFile);
app.set('views', path.join(__dirname, 'views')); // 这里设定了渲染页面时候的默认路径，views/home
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

// app.use('*.html', proxy({
//   target: "http://localhost/",
//   changeOrigin: true
// }));

app.use('*.html', indexRouter);
//app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
