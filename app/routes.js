var http = require('http-request');
var LinkParser = require('./linkParser.js')

// Mongoose Models
var User = require('./models/User.js');
var Group = require('./models/Group.js');
var Property = require('./models/Property.js');

// route middleware to ensure user is logged in
var isLoggedIn = function (req, res, next) {
    req.isAuthenticated() ? next() : res.redirect('/');
};

module.exports = function(app, passport, User, Group, Property) {

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect : '/listings',
        failureRedirect : '/'
      }));

    // used to unlink accounts. for social accounts, just remove the token || logout
    app.get('/unlink/google', function(req, res) {
        console.log('helloo');
        req.logout();
        req.redirect('/')
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            console.log(user, ' has been successfully logged out.');
            res.redirect('/');
        });
    });

    // prevent unauthorized access to assets 
    app.get('/groups');
    app.get('/listings');

    app.get('/api/test', function (req, res) {
        console.log(req);
        res.send(req);
    }),

    app.get('/api/user', function (req, res) {
        User.findOne({_id: req.query.id}, function (err, user) {
            if (user) {
                res.send(user);
            } else {
                res.send(501, err);
            }
        });
    });

    app.post('/api/user', function (req, res) {
        User.findOne({_id: req.body.id}, function (err, user) {
            user.name = req.body.name;
            user.budget = req.body.budget;
            user.location = req.body.location;
            user.prefDistance = req.body.prefDistance;
            user.groups = req.body.groups;
            user.save(function (err, savedUser) {
                console.log(savedUser, 'Successfully saved!');
            });
            Group.findOne({name: req.body.groupName}, function (err, group) {
                
            });
            res.send(user);
        });
    });

    app.get('/api/group', function (req, res) {
        console.log(req.query);
        Group.findOne({name: req.query.groupName}, function (err, group) {
            console.log("Sending back group...", group);
            res.send(group);
        });
    });

    // TODO: API Endpoint returns user, and mucks with user info...
    // RESTful-ize the API
    app.post('/api/group', function (req, res) {
        User.findOne({_id: req.body.id}, function (err, user) {
            user.groups.push(req.body.groupName);
            Group.findOne({name: req.body.groupName}, function (err, group) {
                if (group) {
                    group.members.push(user);
                    group.save();
                    user.save();
                    res.send(user);
                } else {
                    var newGroup = new Group({ 
                        name: req.body.groupName,
                        members: [user],
                        properties: []
                    });
                    newGroup.save();
                    res.send(user);
                }
            });
        });
    });

    // TODO: API Endpoint returns user, and mucks with user info...
    // RESTful-ize the API
    app.delete('/api/group', function (req, res) {
        User.findOne({_id: req.query.id}, function (err, user) {
            user.groups.forEach(function(groupName, i) {
                if (groupName === req.query.groupName) { user.groups.splice(i, 1); }
            });
            Group.findOne({name: req.query.groupName}, function (err, group) {
                group.members.forEach(function(user, i) {
                    if (user.id === req.query.id) { group.members.splice(i, 1); }
                });
                group.save();
                user.save();
                res.send(user);
            });
        });
    });

    app.get('/api/listings', function (req, res) {
        Group.findOne({name: req.query.groupName}, function (err, group) {
            res.send(group.properties);
        });
    });

    app.post('/api/listings', function (req, res) {
        Group.findOne({name: req.body.groupName}, function (err, group) {
            http.get(req.body.url, function (err, response) {
                var listing;
                if (req.body.url.indexOf('craigslist') > -1) { 
                    listing = LinkParser.craigslist(response.buffer.toString(), req.body.url); 
                } else if (req.body.url.indexOf('airbnb') > -1) {
                    listing = LinkParser.airbnb(response.buffer.toString(), req.body.url);
                } else {
                    res.send(501);
                    return null;
                }
                group.properties.push(listing);
                group.save();
                res.send(group.properties);
            });
        })
    });

    app.put('/api/listings', function (req, res) {
        Group.findOne({name: req.query.groupName}, function (err, group) {
            group.properties.forEach(function(listing, i) {
                if (listing.id === req.query.listing._id) {
                    group.properties[i] = req.query.listing;
                }
            });
            group.save();
            res.send(group.properties);
        });
    });

    app.delete('/api/listings', function (req, res) {
        Group.findOne({name: req.query.groupName}, function (err, group) {
            group.properties.forEach(function (listing, i) {
                if (listing.id === req.query.listing._id) { group.properties.splice(i, 1); }
                group.save();
            });
            res.send(group.properties);
        });
    });

    app.post('/login', function (req, res) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (user) {
                res.send(user);
            } else {
                var groupName = "(private) " + req.body.email;
                var name = req.body.email.split('@')[0];
                var newUser = new User({
                    name: name,
                    email: req.body.email,
                    prefDistance: 0,
                    budget: 0,
                    groups: [groupName],
                    location: []
                });
                newUser.save();
                var newGroup = new Group({
                    name: groupName,
                    isPrivate: true,
                    members: [newUser],
                    properties: []
                });
                newGroup.save();
                res.send(newUser);
            }
        });
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};
