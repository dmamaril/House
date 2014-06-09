var Mailgun = require('mailgun-js');
var mgAuth = require('./config/mailGunAuth.js');

var mailgun = new Mailgun({apiKey: mgAuth.api_key, domain: mgAuth.domain});

var MailGun =  {};

MailGun.joinGroupEmail = function (user, sendTo, groupToJoin) {
  var msgData = {};

  msgData.from    = user.google.name;
  msgData.to      = sendTo;
  msgData.subject = user.google.name + ' has invited you to join their group ' + groupToJoin + '!';
  msgData.text    = 'Test text';

  mailgun.messages().send(msgData, function (error, body) {
    console.log(body);
  });
};

module.exports = MailGun;