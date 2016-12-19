var mongoose = require('mongoose');
var SchemaService = require('./schemas');

var FavoriteService = mongoose.model('FavoriteService', SchemaService.favoriteServiceSchema());

module.exports = FavoriteService;