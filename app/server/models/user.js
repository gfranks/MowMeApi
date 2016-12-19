var mongoose = require('mongoose');
var SchemaService = require('./schemas');

var User = mongoose.model('User', SchemaService.userSchema());

module.exports = User;