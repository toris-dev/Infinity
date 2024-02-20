const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { viewsRouter } = require('./routes/viewsRouter');

require('dotenv').config();
mongoose.connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PW}@infinitydb.uzbnsom.mongodb.net/`);
mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected');
  });
  
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
