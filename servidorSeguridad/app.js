var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ciudadanoRouter = require('./routes/ciudadanoRouter');
var hechoDelictivoRouter=require('./routes/hechoDelictivoRouter');
var mongoose = require('mongoose');
var config = require('./config');
var passport = require('passport');
var authenticate = require('./authenticate');

function auth (req, res, next) {
  console.log(req.user);

  if (!req.user) {
    var err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');                          
    err.status = 401;
    next(err);
  }
  else {
        next();
  }
}

var db = mongoose.connect(config.mongoUrl);
mongoose.connection.on('error',()=>{console.log("base de datos en problemas")})
mongoose.connection.once('open',()=>{console.log("Conectado")})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
<<<<<<< HEAD
app.use('/ciudadano',ciudadanoRouter)
app.use('/hecho_delictivo',hechoDelictivoRouter)
=======
app.use('/asdfs',estudianteRouter)
>>>>>>> cd47762e402485e17f62801090afa62b8ef1dfa4

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
