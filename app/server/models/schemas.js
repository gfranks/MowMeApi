var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaService = {};
module.exports = SchemaService;

SchemaService.errorSchema = function() {
	var schema = mongoose.Schema({
		error: String
	});

	schema.methods.toJSON = function() {
		var obj = this.toObject();
	  	delete obj._id;
	  	delete obj.__v;
	  	return obj;
	}

	return schema;
}

SchemaService.sessionSchema = function() {
	var schema = mongoose.Schema({
		token: String
	});

	schema.methods.toJSON = function() {
		var obj = this.toObject();
	  	delete obj._id;
	  	delete obj.__v;
	  	return obj;
	}

	return schema;
}

SchemaService.serviceSchema = function() {
	var schema = mongoose.Schema({
	    id: String,
	    image: String,
	    images: [String],
	    name: String,
	    address: addressSchema(),
	    latitude: mongoose.Schema.Types.Double,
	    longitude: mongoose.Schema.Types.Double,
    	email: String,
    	phone: String,
    	rating: mongoose.Schema.Types.Double,
    	serviceTypes: [SchemaService.serviceTypeSchema()]
	});

	schema.methods.toJSON = function() {
		var obj = this.toObject();
	  	delete obj._id;
	  	delete obj.__v;
	  	return obj;
	};

	return schema;
}

SchemaService.favoriteServiceSchema = function() {
	var schema = mongoose.Schema({
		userId: String,
	    id: String,
	    image: String,
	    images: [String],
	    name: String,
	    address: addressSchema(),
	    latitude: mongoose.Schema.Types.Double,
	    longitude: mongoose.Schema.Types.Double,
    	email: String,
    	phone: String,
    	rating: mongoose.Schema.Types.Double,
    	serviceTypes: [SchemaService.serviceTypeSchema()]
	});

	schema.methods.toJSON = function() {
		var obj = this.toObject();
	  	delete obj._id;
	  	delete obj.__v;
	  	return obj;
	};

	return schema;
}

SchemaService.serviceTypeSchema = function() {
	var schema = mongoose.Schema({
		name: String,
		image: String
	});

	schema.methods.toJSON = function() {
		var obj = this.toObject();
	  	delete obj._id;
	  	delete obj.__v;
	  	return obj;
	}

	return schema;
}

SchemaService.userSchema = function() {
	var schema = mongoose.Schema({
	    id: String,
	    image: String,
	    firstName: String,
	    lastName: String,
	    address: addressSchema(),
	    email: String,
	    password: String,
	    phone: String,
	    serviceTypes: [SchemaService.serviceTypeSchema()]
	});

	schema.methods.toJSON = function() {
		var obj = this.toObject();
	  	delete obj._id;
	  	delete obj.__v;
	  	delete obj.password;
	  	return obj;
	};

	return schema;
}

var addressSchema = function() {
	return {
		street: String,
		city: String,
		state: String,
		zip: String
	};
}