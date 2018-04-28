var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var apiRouter = require('./routes/api');
var registerRouter = require('./routes/register');
var problemsRouter = require('./routes/problems');
var contestsRouter = require('./routes/contests');
var submissionsRouter = require('./routes/submissions');
var ranklistRouter = require('./routes/ranklist');
var helpRouter = require('./routes/help');
var userRouter = require('./routes/user');
var discussionRouter = require('./routes/discussion');
var adminRouter = require('./routes/admin');
var noticeRouter = require('./routes/notice');

var app = express();

var identityKey = 'skey';

app.use(session({
    name: identityKey,
    secret: 'xiepingsdlfjs;ldfjsd;lfsudfsj',  // 用来对session id相关的cookie进行签名
    store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 10000000  // 有效期，单位是毫秒
    }
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/semantic', express.static('public'));

app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/api', apiRouter);
app.use('/register', registerRouter);
app.use('/problems', problemsRouter);
app.use('/contests', contestsRouter);
app.use('/submissions', submissionsRouter);
app.use('/ranklist', ranklistRouter);
app.use('/discussion', discussionRouter);
app.use('/help', helpRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/notice', noticeRouter);

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
