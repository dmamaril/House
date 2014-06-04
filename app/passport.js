var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./config/auth');

var User = require('./models/User.js');
var Group = require('./models/Group.js');

var createUser = function (profile, token, done) {
    var newGroup = new Group();
    newGroup.name = profile.name.givenName + "'s list";
    newGroup.save(function (err) {
        if (err) { throw err; }
        var newUser = new User();

        newUser.google.token = token;
        newUser.google.name  = profile.displayName;
        newUser.google.email = profile.emails[0].value.toLowerCase() || ''; // pull the first email
        newUser.groups.push(newGroup._id);

        console.log(newGroup, 'newGroup');
        console.log(newUser, 'newUser');

        newUser.save();
        return done(null, newUser);
    });
};

var updateUser = function (profile, token, done) {
    User.findOne({ 'google.email' : profile.emails[0].value.toLowerCase() }, function(err, user) {
      if (err) { return done(err); }

      if (user) {
        // if there is a user id already but no token (user was linked at one point and then removed)
        if (!user.google.token) {
            user.google.token = token;
            user.google.name  = profile.displayName;
            user.google.email = profile.emails[0].value.toLowerCase() || ''; // pull the first email

            user.save();
            return done(null, user);
        }
        console.log(user.google.name, ' has been saved to database.');
        return done(null, user);
      } else {
        createUser(profile, token, done);
      }

    });

};

var linkUser = function (profile, token, done) {
     // user already exists and is logged in, we have to link accounts
    var user = req.user; // pull the user out of the session

    user.google.token = token;
    user.google.name  = profile.displayName;
    user.google.email = profileEmail || ''; // pull the first email

    user.save(function(err) {
        if (err)
            throw err;
        return done(null, user);
    });   
};

module.exports = function(passport, passportHelpers) {
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
        }, function(req, token, refreshToken, profile, done) {
            console.log(passportHelpers);
            process.nextTick(function() {
                if (!req.user) {
                    updateUser(profile, token, done);
                } else {
                    linkUser(profile, token, done);
                }
            });
        })
    );
};
