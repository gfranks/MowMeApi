Service = require("../models/service.js");
ServiceType = require("../models/service-type.js");
var SM = {};
module.exports = SM;

SM.getServices = function(location, filters, callback) {
	// TODO
	callback(null, Service.mockServices());
}

SM.getService = function(serviceId, callback) {
	// TODO
	var services = Service.mockServices();
	for (var v in services) {
		var service = services[v];
		if (serviceId === service.id) {
			callback(null, service);
			return;
		}
	}
	callback('Unable to find service', null);
}