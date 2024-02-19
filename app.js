var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { viewsRouter } = require('./routes/viewsRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.static('views'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(viewsRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
