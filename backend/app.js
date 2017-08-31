var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

// File with config names
require('dotenv').config();

var app = express();

app.use(favicon(path.join(__dirname, 'image', 'favicon.ico')))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://37.59.125.162:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use('/', require('./routes/index'));

// Define prefix API 
var api = express.Router();
app.use('/api', api);

// Router-level Middleware


// Routes:
var products = require('./routes/products.routes');

api.use('/products', products);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	const dev = (process.env.Development == 'true');
	res.locals.message = dev ? err.message : "Only for Development";

	res.status(err.status || 500);
	res.json({
		success: false,
		error: true,
		msg: res.locals.message
	});
});

module.exports = app;