var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
  name: String,
  isPrivate: Boolean
});

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
