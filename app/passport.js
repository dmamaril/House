var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./config/auth');

module.exports = function(passport, passportHelpers, User) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },

    function(req, token, refreshToken, profile, done) {
        console.log(passportHelpers);
        process.nextTick(function() {
            if (!req.user) {
                passportHelpers.updateUser(profile, token, done);
            } else {
                passportHelpers.linkLoggedInUser(profile, token, done);
            }
        });

    }));

};
