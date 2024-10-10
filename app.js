var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var logger = require('morgan');

var indexR = require('./routes/index');
require('dotenv').config();
var app = express();
const job = require('./cron.js').job;
var mongoose = require('mongoose');
var port = 3003;
var database = process.env.DATABASE;

//1C. connect to mongodb
mongoose.connect(database)
  .then(() => console.log('connect to db succeed !'))
  .catch((err) => console.log('connect to db failed. Error: ' + err));

//2. config body-parser library (get data from client-side)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'yourSecretKey',  
  resave: false,  
  saveUninitialized: true,  
  cookie: { secure: false } 
}));
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexR);
job.start();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler

app.listen(port, () => {
  console.log(`[ ready ] On port ${port}`);
});

module.exports = app;

