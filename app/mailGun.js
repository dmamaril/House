var Mailgun = require('mailgun-js');
var mgAuth = require('./config/mailGunAuth.js');

var mailgun = new Mailgun({apiKey: mgAuth.api_key, domain: mgAuth.domain});

// var MailGun =  {};

var inviteToGroupEmail = function (sendTo, groupToJoin) {
  var msgData = {};

  msgData.from    = 'House: apartment hunting made easy <noreply@house.com>';
  msgData.to      = sendTo;
  msgData.subject = user.google.name + ' has invited you to join their group ' + groupToJoin + '!';
  msgData.html    = 'Test text';

  mailgun.messages().send(msgData, function (error, body) {
    console.log(body);
  });
};

var joinGroupEmail = function (userTo, groupToJoin) {
  var msgData = {};

  msgData.from    = 'House: apartment hunting made easy <noreply@house.com>';
  msgData.to      = userTo.google.email;
  msgData.subject = "You've been added to " + groupToJoin.name;
  msgData.html    = "Add this key: " + groupToJoin._id;
};

var MailGun = function (app) {
  /* INVITE ROUTE */
  // app.get('/invite/:groupId/:email', function (req, res) {
  //   Group.findOne({_id: req.params.groupId}, function (err, group) {
  //     User.findOne({google.email: req.params.email}, function(err, user) {
  //       if (user) {
  //         inviteToGroupEmail(user.google.email, group.name);
  //         res.send(200, "Invite sent");
  //       } else {
  //         res.send(404, "User not registered");
  //       }
  //     });
  //   });
  // });

  /* JOIN ROUTE */
  app.get('/join', function (req, res) {
    User.findOne({ _id: req.params.userId }, function (err, user) {
      if (err) { return err; }
      user.groups.push(req.params.groupId);
      user.save(function (user) {
        res.send(200, "Added");
      });
    });
  });
};

module.exports = MailGun;