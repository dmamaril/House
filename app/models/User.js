var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    prefDistance: String,
    budget: Number,
    groups: Array, // names, not group objects
    location: Array // lat & long
});

var User = mongoose.model('User', userSchema);

module.exports = User;
