var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var schema = mongoose.Schema({
    id: String,
    image: String,
    images: [String],
    name: String,
    address: String,
    latitude: mongoose.Schema.Types.Double,
    longitude: mongoose.Schema.Types.Double,
    email: String,
    phone: String,
    rating: mongoose.Schema.Types.Double
});

var Service = mongoose.model('Service', schema);

module.exports = Service;