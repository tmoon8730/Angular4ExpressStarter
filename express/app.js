var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Task = require('./api/models/todoModel');

var app = express();

/**
 * MongoDB RESTful API
 */
mongoose.Promise = global.Promise;
mongoose.createConnection('mongodb://localhost/tododb');
var routes = require('./api/routes/todoRoutes');
routes(app);

/**
 * Express Configuration
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

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
