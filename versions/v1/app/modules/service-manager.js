Service = require("../models/service.js")
var SM = {};
module.exports = SM;

// TODO Figure way to not have data container on Service obj

SM.getServices = function(location, filters, callback) {
	// TODO
	callback(null, JSON.stringify(availableServices()));
}

SM.getService = function(serviceId, callback) {
	// TODO
	var services = availableServices();
	for (var v in services) {
		var service = services[v];
		if (serviceId === service.id) {
			callback(null, JSON.stringify(service));
			return;
		}
	}
	callback("Unable to find service", null);
}

var availableServices = function() {
	return [ 
		new Service({
			id: "1234",
			image: "image",
			name: "Ryan's Lawn Service",
			address: "111 Peachtree Pkwy, Norcross, GA",
			latitude: 33.789466,
			longitude: -84.372429,
			rating: 4.7
		}),
		new Service({
			id: "2345",
			image: "image",
			name: "Phil's Lawn Service",
			address: "111 Peachtree Pkwy, Norcross, GA",
			latitude: 33.780963,
			longitude: 33.780963,
			rating: 4.3
		}),
		new Service({
			id: "3456",
			image: "image",
			name: "Garrett's Lawn Service",
			address: "111 Peachtree Pkwy, Norcross, GA",
			latitude: 33.794099,
			longitude: -84.396017,
			rating: 4.7
		}),
		new Service({
			id: "4567",
			image: "image",
			name: "Mow Me Lawn Service",
			address: "111 Peachtree Pkwy, Norcross, GA",
			latitude: 33.766709,
			longitude: -84.372928,
			rating: 2.5
		}),
		new Service({
			id: "5678",
			image: "image",
			name: "Cut and Edge",
			address: "111 Peachtree Pkwy, Norcross, GA",
			latitude: 33.766719,
			longitude: -84.372938,
			rating: 3.0
		})
	];
}