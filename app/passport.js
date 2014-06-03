var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./config/auth');

module.exports = function(passport, User, Group) {

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
        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.google.token) {
                            user.google.token = token;
                            user.google.name  = profile.displayName;
                            user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                            user.groups.push(user.google.email);

                            user.save(function(err) {
                                if (err) { throw err; }
                                var newGroup = new Group({
                                    name: user.google.email,
                                    isPrivate: true,
                                    members: [user],
                                    properties: []
                                });
                                newGroup.save(function (err) {
                                    if (err) { throw err; }
                                    return done(null, user);
                                });
                            });
                        }
                        console.log(user.google.name, ' has been saved to database.');
                        return done(null, user);
                    } else {
                        var newUser          = new User();

                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                        newUser.groups.push(newUser.google.email);

                        newUser.save(function(err) {
                            if (err) { throw err; }
                            var newGroup = new Group({
                                name: newUser.google.email,
                                isPrivate: true,
                                members: [newUser],
                                properties: []
                            });
                            newGroup.save(function (err) {
                                if (err) { throw err; }
                                return done(null, newUser);
                            });
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user               = req.user; // pull the user out of the session

                user.google.id    = profile.id;
                user.google.token = token;
                user.google.name  = profile.displayName;
                user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                user.groups.push(user.google.email);

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });

            }

        });

    }));

};
