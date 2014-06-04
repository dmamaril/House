var mongoose = require('mongoose');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    name: String,
    email: String,
    prefDistance: String,
    budget: Number,
    groups: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],
    location: Array // lat & long
});

// userSchema.pre('save', function (next) {
//   var cipher = Promise.promisify(bcrypt.hash);
//   return cipher(this.password, null, null).bind(this)
//     .then(function(hash) {
//       this.set('password', hash);
//       next();
//     });
// });

// userSchema.methods.comparePassword = function(attemptedPassword, callback) {
//   bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
//     callback(isMatch);
//   });
// };

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


var User = mongoose.model('User', userSchema);

module.exports = User;
