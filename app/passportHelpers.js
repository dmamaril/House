var User = require('./models/User');
var Group = require('./models/Group');

var methods = {}

  methods.saveNewUser = function (profile, token, done) {

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

  methods.updateUser = function (profile, token, done) {
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
        methods.saveNewUser(profile, token, done);
      }

    });

  };

  methods.linkLoggedInUser = function (profile, token, done) {
     // user already exists and is logged in, we have to link accounts
    var user               = req.user; // pull the user out of the session

    user.google.token = token;
    user.google.name  = profile.displayName;
    user.google.email = profileEmail || ''; // pull the first email

    user.save(function(err) {
        if (err)
            throw err;
        return done(null, user);
    });   
  };

module.exports = methods;