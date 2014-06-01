/* ==== MODULES ==== */
var express = require('express');
var app = express();
var mongoose = require('mongoose');

/* ==== CONFIG ==== */
// database
var dbConfig = require('./config/db.js');
var port = process.env.PORT || 8000;

mongoose.connect(dbConfig.url);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() { console.log("Mongo DB connected!"); });

// express
app.configure(function() {
    app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users
    app.use(express.logger('dev'));                     // log every request to the console
    app.use(express.bodyParser());                      // pull information from html in POST
    app.use(express.methodOverride());                  // simulate DELETE and PUT
});

// routes
require('./app/routes')(app);                           // pass our application into our routes

// start app
app.listen(port);
console.log('Houseclip started on port ' + port);
exports = module.exports = app;