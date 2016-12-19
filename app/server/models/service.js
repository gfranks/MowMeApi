var mongoose = require('mongoose');
var SchemaService = require('./schemas');

var Service = mongoose.model('Service', SchemaService.serviceSchema());

Service.mockServices = function() {
	return [ 
		new Service({
			id: "1234",
			image: "http://www.green-leaf-landscaping.com/wp-content/uploads/2012/12/lawnservice650head.png",
			name: "Ryan's Lawn Service",
			address: {
				street: "111 Peachtree Pkwy",
				city: "Norcross",
				state: "GA",
				zip: "30071"
			},
			latitude: 33.789466,
			longitude: -84.372429,
			rating: 4.7,
			serviceTypes: []
		}),
		new Service({
			id: "2345",
			image: "http://www.bmlawn.com/uploads/5/6/8/9/56890835/3559263_orig.jpg",
			name: "Phil's Lawn Service",
			address: {
				street: "111 Peachtree Pkwy",
				city: "Norcross",
				state: "GA",
				zip: "30071"
			},
			latitude: 33.780963,
			longitude: -84.390216,
			rating: 4.3,
			serviceTypes: []
		}),
		new Service({
			id: "3456",
			image: "http://lawncareandlandscape.com/wp-content/themes/pinkandgreen/images/broward/lawn-care-service-hollywood.jpg",
			name: "Garrett's Lawn Service",
			address: {
				street: "111 Peachtree Pkwy",
				city: "Norcross",
				state: "GA",
				zip: "30071"
			},
			latitude: 33.794099,
			longitude: -84.396017,
			rating: 4.7,
			serviceTypes: []
		}),
		new Service({
			id: "4567",
			image: "http://www.fjlawncare.com/wp-content/uploads/2013/03/lawn-mowing-700x350.jpg",
			name: "Mow Me Lawn Service",
			address: {
				street: "111 Peachtree Pkwy",
				city: "Norcross",
				state: "GA",
				zip: "30071"
			},
			latitude: 33.766709,
			longitude: -84.372928,
			rating: 2.5,
			serviceTypes: []
		}),
		new Service({
			id: "5678",
			image: "http://barrylandscapewa.com/wp-content/themes/CustomBlank2011/images/header.png",
			name: "Barry Landscape & Maintenance Service",
			address: {
				street: "111 Peachtree Pkwy",
				city: "Norcross",
				state: "GA",
				zip: "30071"
			},
			latitude: 33.766719,
			longitude: -84.372938,
			rating: 3.0,
			serviceTypes: []
		})
	];
}

module.exports = Service;