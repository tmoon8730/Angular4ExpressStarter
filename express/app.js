var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var apiRouter = require('./api/api.route');

/**
 * MongoDB Configuration
 */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/product', {useMongoClient: true})
  .then(() => console.log('[mongodb] Connection Succesful'))
  .catch((err) => console.error(err));

/**
 * Express Configuration
 */
app.use(logger('dev'));
// Allow for parsing json or urls out of request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Allow for storing and retrieving of cookies
app.use(cookieParser());
// Use /api to hit the api router which handles all backend api routes
app.use('/api',apiRouter);

/**
 * Serve Angular 4 frontend
 */
// Angular DIST output folder
app.use(express.static('../angular/dist'));

// Set all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../angular/dist/index.html'));
});

module.exports = app;
