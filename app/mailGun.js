var Mailgun = require('mailgun-js');
var mgAuth = require('./config/mailGunAuth.js');

var User = require('./models/User.js');
var Group = require('./models/Group.js');

var mailgun = new Mailgun({apiKey: mgAuth.api_key, domain: mgAuth.domain});


var inviteToGroupEmail = function (userTo, groupToJoin) {
  var msgData = {};

  msgData.from    = 'House: apartment hunting made easy <noreply@house.com>';
  msgData.to      = userTo.google.email;
  msgData.subject = "You've been invited to join " + groupToJoin.name;
  msgData.html    = "Hey, " + userTo.google.name + ' Join ' +
                    '<a href="http://127.0.0.1:8080/join/group/' + groupToJoin._id + '/users/' + userTo._id + '">here!</a>';

  mailgun.messages().send(msgData, function (error, body) {
    console.log(body);
  });
};

module.exports = function (app) {
  /* INVITE ROUTE */
  app.get('/invite/:groupId/:email', function (req, res) {
    Group.findOne({_id: req.params.groupId}, function (err, group) {
      User.findOne({ 'google.email' : req.params.email}, function(err, user) {
        if (user) {
          inviteToGroupEmail(user, group);
          res.send(200, "Invite sent");
        } else {
          res.send(404, "User not registered");
        }
      });
    });
  });

  /* JOIN ROUTE */
  app.get('/join/group/:groupId/users/:userId', function (req, res) {
    User.findOne({ _id: req.params.userId }, function (err, user) {
      if (err) { return err; }
      console.log(user);
      user.groups.push(req.params.groupId);
      user.save(function () {
        console.log(user.google.name, ' added to groupId: ', req.params.groupId);
        res.redirect('/');
      });
    });
  });
};
