var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = module.exports = express();
var sessionHeader = 'x-session-id';

mongoose.Promise = global.Promise;

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.use(function(req, res, next) {
	if (req.headers[sessionHeader] || req.url === '/session' || req.url === '/logout') {
		next();
	} else {
		res.sendStatus(401);
	}
});

var dbHost = process.env.DB_HOST;
var dbPort = process.env.DB_PORT;
var dbName = process.env.DB_NAME;
var dbURL = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+dbHost+':'+dbPort+'/'+dbName;

mongoose.connect(dbURL, function (error) {
	if (error) {
		console.log(error);
	}
});


require('./app/server/routes')(app);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});