var mongoose = require('mongoose');
var SchemaService = require('./schemas');

var Error = mongoose.model('Error', SchemaService.errorSchema());

Error.makeError = function(err) {
	return new Error({
		error: err
	});
}

module.exports = Error;