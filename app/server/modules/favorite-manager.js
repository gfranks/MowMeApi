Service = require("../models/service.js");
FavoriteService = require("../models/favorite-service.js");
var FM = {};
module.exports = FM;

FM.getFavorites = function(userId, callback) {
	FavoriteService.find({userId: userId}, 'id image name address latitude longitude rating', callback);
}

FM.favoriteService = function(userId, serviceId, callback) {
	FavoriteService.findOne({ $and: [{userId: userId, id: serviceId}] }, function (err, favorite) {
		if (favorite) {
			callback('Service has already been favorited', null);
		} else {
			// TODO: look up and favorite
			var services = Service.mockServices();
			for (var v in services) {
				var service = services[v];
				if (serviceId === service.id) {
					var favoritedService = new FavoriteService(service);
					favoritedService.userId = userId;
					favoritedService.save(function (err) {
						if (err) {
							callback('Unable to favorite service', null);
						} else {
							callback(null, favoritedService);
						}
					});
				}
			}	
		}
    });
}

FM.unfavoriteService = function(userId, serviceId, callback) {
	FavoriteService.remove({ $and: [{userId: userId, id: serviceId}] }, function(err, obj) {
		if (err) {
			callback('Unable to remove favorite', null);
		} else {
			callback(null, obj);
		}
	});
}

FM.migrateFavoritedServices = function(oldUserId, newUserId) {
	FavoriteService.update({userId: oldUserId}, { $set: {userId: newUserId} }, {multi: true}, function(err, num) {
    	if (err) {
			console.log('This error occurred: ' + err);
    	}
    });
}