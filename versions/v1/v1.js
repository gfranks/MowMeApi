var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var MongoStore = require('connect-mongo')(session);

module.exports = function(app, router) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	// build mongo database connection url //

	var apiSecret = process.env.API_SECRET;
	var dbHost = process.env.DB_HOST;
	var dbPort = process.env.DB_PORT;
	var dbName = process.env.DB_NAME;

	var dbURL = 'mongodb://'+dbHost+':'+dbPort+'/'+dbName;
	if (process.env.ENV == 'PROD') {
		// prepend url with authentication credentials // 
		dbURL = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+dbHost+':'+dbPort+'/'+dbName;
	}

	// app.use(session({
		// secret: apiSecret,
		// proxy: true,
		// resave: true,
		// saveUninitialized: true,
		// store: new MongoStore({ url: dbURL })
		// })
	// );

	require('./app/routes')(router);

	return router;
}