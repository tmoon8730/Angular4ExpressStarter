var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var products = require('./api/routes/products');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/products',products);


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
