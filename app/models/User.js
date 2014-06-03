var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    prefDistance: String,
    budget: Number,
    groups: Array, // names, not group objects
    location: Array // lat & long
});



var User = mongoose.model('User', userSchema);

module.exports = User;
