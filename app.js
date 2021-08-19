const createError = require('http-errors');
const express = require('express');
const cors = require("cors");
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const fs = require("fs");
const dotenv = require("dotenv");
if(fs.existsSync(__dirname + "/.env"))
  dotenv.config({path:__dirname + "/.env"});
else
  dotenv.config();


const authRoute = require("./routes/auth.route");
const meRoute = require("./routes/me.route");
const gradeRoute = require("./routes/grade.route")

const app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());


app.use('/auth', authRoute);
app.use('/me', meRoute);
app.use('/grade', gradeRoute);

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
  console.log(err)
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
