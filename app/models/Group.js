var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
  name: String,
  isPrivate: Boolean,
  members: Array, // actual user objects
  properties: Array // actual property objects
});

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
