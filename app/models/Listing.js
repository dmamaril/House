var mongoose = require('mongoose');

var listingSchema = mongoose.Schema({
  votes: Array,
  title: String,
  url: String,
  location: Array, // long, lat
  rooms: String,
  price: Number,
  group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
});

var Listing = mongoose.model('Listing', listingSchema);

module.exports = Property;
