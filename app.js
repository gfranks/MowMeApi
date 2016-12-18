var http = require('http');
var express = require('express');
var app = module.exports = express();
var router = express.Router()

app.set('port', process.env.PORT || 3000);

// define the versions
var VERSIONS = {'Version 1': '/v1'};

// route to display versions
app.get('/', function(req, res) {
    res.json(VERSIONS);
});

// versioned routes go in the routes/ directory
// import the versions
for (var v in VERSIONS) {
    app.use(VERSIONS[v], require('./versions' + VERSIONS[v] + VERSIONS[v])(app, router));
}

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});