const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');

const apiRouter = require('./routes/api');
const indexRouter = require('./routes/index');

const { viewsRouter } = require('./routes/viewsRouter');
const getUserFromJWT = require('./middlewares/get-user-from-jwt');
const errorHandler = require('./middlewares/error-handler');

require('./passport')();

require('dotenv').config();
mongoose.connect(
  `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PW}@infinitydb.uzbnsom.mongodb.net/`,
);
mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected');
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use('/static', express.static(path.resolve(__dirname, 'views', 'static')));
app.use(express.static('views'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(viewsRouter);
app.use('/api', apiRouter);

app.use(passport.initialize());
app.use(getUserFromJWT);

app.use('/', indexRouter);

app.use(errorHandler);

// 로그아웃 위치 router, path
app.post('/logout', function (req, res, next) {
  return res.cookie('token', '').json({ message: 'done' });
});

module.exports = app;
