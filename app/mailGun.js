var Mailgun = require('mailgun-js');
var mgAuth = require('./config/mailGunAuth.js');

var mailgun = new Mailgun({apiKey: mgAuth.api_key, domain: mgAuth.domain});

// var MailGun =  {};

var inviteToGroupEmail = function (user, sendTo, groupToJoin) {
  var msgData = {};

  msgData.from    = 'House: apartment hunting made easy <noreply@house.com'>;
  msgData.to      = sendTo;
  msgData.subject = user.google.name + ' has invited you to join their group ' + groupToJoin + '!';
  msgData.html    = 'Test text';

  mailgun.messages().send(msgData, function (error, body) {
    console.log(body);
  });
};

var joinGroupEmail = function (userTo, groupToJoin) {
  var msgData = {};

  msgData.from    = 'House: apartment hunting made easy <noreply@house.com'>;
  msgData.to      = userTo.google.email;
  msgData.subject = "You've been added to " + groupToJoin.name;
  msgData.html    = "Add this key: " + groupToJoin._id;
};

var MailGun = function (app) {
  /* INVITE ROUTE */
  app.get('path', function (req, res) {
    User.findOne({ _id: req.params.id }, function (err, userToInvite) {
      if (userToInvite) {
        joinGroupEmail(req.params.userId, userToInvite, req.params.groupId);
      }
    });
  });

  /* JOIN ROUTE */
  app.get('path', function (req, res) {
    User.findOne({ 'google.email' : req.params.email }, function (err, user) {
      if (user) {

      }
    });
  });
};

module.exports = MailGun;