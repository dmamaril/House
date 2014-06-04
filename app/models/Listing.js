var mongoose = require('mongoose');

var propertySchema = mongoose.Schema({
  votes: Array,
  title: String,
  url: String,
  location: Array, // long, lat
  rooms: String,
  price: Number
});

var Property = mongoose.model('Property', propertySchema);

module.exports = Property;
