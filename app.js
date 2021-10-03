var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressFileupload = require('express-fileupload');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongojs = require('mongojs');

var app = express();
app.use(expressFileupload());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/login', indexRouter);
app.use('/process_login', indexRouter);
app.use('/welcome', indexRouter);
app.use('/story', indexRouter);
app.use('/logout', indexRouter);

app.use('/getdata', indexRouter);
module.exports = app;
