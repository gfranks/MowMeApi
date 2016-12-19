var mongoose = require('mongoose');
var SchemaService = require('./schemas');

var Session = mongoose.model('Session', SchemaService.sessionSchema());

module.exports = Session;