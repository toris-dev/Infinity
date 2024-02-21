const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport'); 

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const { viewsRouter } = require('./routes/viewsRouter');
const errorHandler = require('./middlewares/error-handler');
const getUserFromJWT = require('./middlewares/get-user-from-jwt');

require('./passport')();

require('dotenv').config();
mongoose.connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PW}@infinitydb.uzbnsom.mongodb.net/`);
mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected');
  });

var app = express();

app.use(passport.initialize());
app.use(getUserFromJWT);

app.use(logger('dev'));
app.use(express.json());
app.use(express.static('views'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(viewsRouter);


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use(errorHandler);

module.exports = app;
