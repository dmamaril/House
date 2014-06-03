/* ==== MODULES ==== */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');

/* ==== CONFIG ==== */
var db = require('./app/config/db.js');
var port = process.env.PORT || 8080;

/* ==== MONGODB ==== */
var User = require('./app/models/User.js');
var Group = require('./app/models/Group.js');
var Listing = require('./app/models/Listing.js');


mongoose.connect(db.url);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() { console.log("Mongo DB connected!"); });

require('./app/passport')(passport, User, Group); // pass passport for configuration

app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users

// set up our express application
app.use(morgan('dev'));                     // log every request to the console
app.use(cookieParser());                    // read cookies (needed for auth)
app.use(bodyParser());                      // get information from html forms

// required for passport
app.use(session({ secret: 'houseApp' }));   // session secret
app.use(passport.initialize());
app.use(passport.session());                // persistent login sessions
app.use(flash());                           // use connect-flash for flash messages stored in session
app.use(methodOverride());                  // simulate DELETE and PUT

// routes
require('./app/routes.js')(app, passport, User, Group, Listing); // load our routes and pass in our app and fully configured passport

// start app
app.listen(port);
console.log('Houseclip started on port ' + port);
exports = module.exports = app;