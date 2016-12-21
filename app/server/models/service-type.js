var mongoose = require('mongoose');
var SchemaService = require('./schemas');

var ServiceType = mongoose.model('ServiceType', SchemaService.serviceTypeSchema());

module.exports = ServiceType;