var jwt = require('jsonwebtoken');
var User = require('./models/User.js');
var Group = require('./models/Group.js');
var Property = require('./models/Property.js');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests

  app.get('/api/user', function (req, res) {
    User.findOne({ id: req.user.id }, function (err, user) {
      if (!err) {
        res.send(user);
      } else {
        res.send(501, err);
      }
    });
  });

  app.post('/api/user', function (req, res) {
    // name budget location prefDistance
    User.findOne({ id: req.user.id }, function (err, user) {
      if (user) {
        user.name = req.body.name || user.name;
        user.budget = req.body.budget || user.budget;
        user.location = req.body.location || user.location;
        user.prefDistance = req.body.prefDistance || user.prefDistance;
      }
      user.save(function (err, savedUser) { 
        console.log (savedUser, 'Successfully saved!'); 
      });
    });
  });

  app.get('/api/group', function (req, res) {
    var groupId;
    User.findOne({ id: req.user.id }, function (err, user) {
      if (user) {
        Group.findOne({ id: user.groupId }, function (err, group) {
          var members;
          if (group) {
            members = group.members;
            members.forEach(function (member) {
              delete member.password;
            });
            res.send(members);
          } else {
            res.send(501, err);
          }
        });
      } else {
        res.send(501, err);
      }
    });
  });

  app.post('/api/group', function (req, res) {
    var updateUser = function (savedGroup, req) {
      User.findOne({ id: req.user.id }, function (err, user) {
        if (user) {
          user.groupId = savedGroup._id;
          user.save();
        }
      })
    };

    Group.findOne({ groupName: req.body.groupName }, function (err, group) {
      if (!group) {
        var newGroup = new Group();
        newGroup.members.push(req.user.id);
        newGroup.groupName = req.body.groupName;
        newGroup.save(function(err, savedGroup, numberAffected, req) { 
          updateUser(savedGroup,req); 
        });
      } else if (group) {
        group.members.push(req.user.id);
        group.save(function(err, savedGroup, numberAffected, req) { 
          updateUser(savedGroup, req); 
        });
      }
    });
  });

  app.get('/api/properties', function (req, res) {
    // get property linked to user (and group, if the user belongs to a group)

  });

  app.post('/api/properties', function (req, res) {
    var newProperty = new Property();
    newProperty.url = req.body.url;
    newProperty.title = req.body.title;
    newProperty.location = req.body.location;
    newProperty.price = req.body.price;
    newProperty.votes = 0;

    newProperty.save();
  });

  app.post('/register', function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
      if (!user) {
        var newUser = new User ({ 
          email: req.body.email,
          name: req.body.name, 
          password: req.body.password
        });
        newUser.save(function (err, user){
          console.log('Saving user...' );
          console.log(user);
          console.log('Saved!');
          res.send(user);
        });      
      }
    });
  });

  app.post('/login', function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
      if (!err && user) {
        user.comparePassword(req.body.password, function (isMatch) {
          if (isMatch) { 
            var tokenProfile = {
              name: user.name 
              email: user.email,
              id: user._id
            };
            console.log(user.firstname + ' has successfully logged in.');
            var token = jwt.sign(tokenProfile, secret, {expiresInMinutes: 20});
            res.json({token:token, _id: user._id, user: user.name});
          } else { 
            res.send(401, 'Wrong user or password'); 
          }
        });
      } else { 
        console.log ('Error @ Line 25 requestHandler.js');
      }
    });
  });

  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });

};

