// modules =================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');


// configuration ===========================================

// config files
var db = require('./config/db.js');
var port = process.env.PORT || 8000; // set our port

mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function callback() {
  console.log("Mongo DB connected!");
});

app.configure(function() {
    app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users
    app.use(express.logger('dev'));                     // log every request to the console
    app.use(express.bodyParser());                      // pull information from html in POST
    app.use(express.methodOverride());                  // simulate DELETE and PUT
    app.use('/api', expressJwt({secret: 'houseApp'}));
});

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port);           // shoutout to the user
exports = module.exports = app;                         // expose app