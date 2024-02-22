var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { viewsRouter } = require('./routes/viewsRouter');
const errorHandler = require('./middlewares/error-handler');


require('./passport')();

require('dotenv').config();
mongoose.connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PW}@infinitydb.uzbnsom.mongodb.net/`);
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

app.use(passport.initialize());
app.use(getUserFromJWT);

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use(errorHandler);


// 로그아웃 path??
app.post('/logout', function(req, res, next){

    return res.cookie('token',"").json({"message":"done"});
});

module.exports = app;