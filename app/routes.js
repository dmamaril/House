var jwt = require('jwt');
var User = require('./models/User.js');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});


  app.post('/api/user', function (req, res) {
    // get user profile
  });

  app.get('/api/group', function (req, res) {
    // get group member's info
  });

  app.get('/api/properties', function (req, res) {
    // get properties linked to user (and group, if the user belongs to a group)
  });

  app.post('/register', function (req, res) {
    User.findOne({email: req.body.email}, function (err, exists) {
      if (!exists) {
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
            res.json({token:token, _id: user._id, user: user.firstname + ' ' + user.lastname});
          } else { 
            res.send(401, 'Wrong user or password'); 
          }
        });
      } else { 
        console.log ('Error @ Line 25 requestHandler.js');
      }
    });
  });


};