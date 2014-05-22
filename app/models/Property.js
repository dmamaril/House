var mongoose = require('mongoose');

var propertySchema = mongoose.Schema({
  votes: Number,
  title: String,
  url: String,
  location: Array, // long lat
  price: String
});

var Property = mongoose.model('Property', propertySchema);

module.exports = Property;
