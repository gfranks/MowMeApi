var http = require('http')
  , express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose')
  , morgan = require('morgan')
  , app = module.exports = express()
  , routerMobile = express.Router()
  , routerWeb = express.Router()
  , userAgent = 'user-agent'
  , sessionHeader = 'x-session-id'
  , dbHost = process.env.DB_HOST
  , dbPort = process.env.DB_PORT
  , dbName = process.env.DB_NAME
  , dbURL = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+dbHost+':'+dbPort+'/'+dbName

mongoose.Promise = global.Promise;

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/server/views')
app.set('view engine', 'jade')
app.use(morgan('combined', {
	skip: function (req, res) { return res.statusCode < 400 }
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(stylus.middleware({ src: __dirname + '/app/public' }));
// app.use(express.static(__dirname + '/static'))
// app.use(express.static(__dirname + '/app/public'))

mongoose.connect(dbURL, function (error) {
	if (error) {
		console.log(error);
	}
});

app.use(function(req, res, next) {
	if (req.headers[userAgent] && req.headers[userAgent] === 'android') {
		if (req.headers[sessionHeader] || req.url === '/session' || req.url === '/logout') {
			req.url = "/mobile" + req.url;
			next();
		} else {
			res.sendStatus(401);
		}
	} else {
		req.url = "/web" + req.url;
		next();
	}
});

app.use("/mobile", require('./app/server/mobileRoutes')(routerMobile));
app.use("/web", require('./app/server/webRoutes')(routerWeb));

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});