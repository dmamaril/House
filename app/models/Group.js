var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
  members: Array,
  groupName: String
});

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
