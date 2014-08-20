var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./config/auth.js');

var User = require('./models/User.js');
var Group = require('./models/Group.js');

var createUser = function (profile, token, done) {
    var newGroup = new Group();
    newGroup.name = profile.name.givenName + "'s list";
    newGroup.save(function (err) {
        if (err) { throw err; }
        var newUser = new User();

        newUser._id = profile.id;
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
            user._id          = profile.id;
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

var Authentication = function(app, passport) {
    /* === PASSPORT CONFIG === */
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({
            clientID        : process.env.GOOGLEID || configAuth.googleAuth.clientID,
            clientSecret    : process.env.GOOGLESECRET || configAuth.googleAuth.clientSecret,
            callbackURL     : prcess.env.GOOGLECB || configAuth.googleAuth.callbackURL,
            passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        }, function(req, token, refreshToken, profile, done) {
            process.nextTick(function() {
                if (!req.user) {
                    updateUser(profile, token, done);
                } else {
                    linkUser(profile, token, done);
                }
            });
        })
    );

    /* === O-AUTH ROUTES === */   
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback', function (req, res, next) {
        passport.authenticate('google', function (err, user, info) {
            var redirectURL = '/#/home/' + user._id;
            console.log('RedirectURL', redirectURL);
            req.user = user;

            if (err) { return next(err); }
            if (!user) { return res.redirect('/'); }

            if (req.session.redirectURL) {
                console.log('authentication.js Req.session.redirectURL', req.session.redirectURL)
                redirectURL = req.session.redirectURL;
                req.session.redirectURL = null;
            }

            req.logIn(user, function (err) {
                if (err) { return next(err); }
            });

            res.redirect(redirectURL);
        })(req, res, next);
    });


    app.get('/unlink/google/:id', function(req, res) {

        User.findOne({ _id: req.params.id }, function (err, user) {
            user.google.token = undefined;
            user.save(function(err) {
                console.log(user, ' has been successfully logged out.');
                res.send(200);
            });
        })

        req.logout();
    });

    /* === RESTRICTION ACCESS === */
    app.get('/groups', Authentication.check);
    app.get('/listings', Authentication.check);
};

Authentication.check = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = Authentication;