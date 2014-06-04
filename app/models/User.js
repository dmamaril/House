var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    prefDistance: String,
    budget: Number,
    groups: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],
    location: Array // lat & long
});

var User = mongoose.model('User', userSchema);

module.exports = User;