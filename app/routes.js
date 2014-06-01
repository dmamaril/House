var jwt = require('jsonwebtoken');
var http = require('http-request');
var xml2js = require('xml2js');

// Mongoose Models
var User = require('./models/User.js');
var Group = require('./models/Group.js');
var Property = require('./models/Property.js');

module.exports = function(app) {
    app.get('/api/test', function (req, res) {
        console.log(req);
        res.send(req);
    }),

    app.get('/api/user', function (req, res) {
        User.findOne({_id: req.body.id}, function (err, user) {
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
                console.log (savedUser, 'Successfully saved!');
            });
            res.send(user);
        });
    });

    app.get('/api/group', function (req, res) {
        Group.findOne({name: req.body.groupName}, function (err, group) {
            res.send(group.members);
        });
    });

    app.post('/api/group', function (req, res) {
        User.findOne({_id: req.body.id}, function (err, user) {
            user.groups.push(req.body.groupName);
            Group.findOne({name: req.body.groupName}, function (err, group) {
                if (group) {
                    group.members.push(user);
                    group.save();
                    user.save();
                    res.send(group.members);
                } else {
                    var newGroup = new Group({ 
                        name: req.body.groupName,
                        members: [user],
                        properties: []
                    });
                    newGroup.save();
                    res.send(newGroup.members);
                }
            });
        });
    });

    app.delete('/api/group', function (req, res) {
        User.findOne({_id: req.body.id}, function (err, user) {
            user.groups.forEach(function(groupName, i) {
                if (groupName === req.body.groupName) { user.groups.splice(i, 1); }
            });
            Group.findOne({name: req.body.groupName}, function (err, group) {
                group.members.forEach(function(user, i) {
                    if (user._id === req.body.id) { group.members.splice(i, 1); }
                });
                group.save();
                user.save();
                res.send(group.members);
            });
        });
    });

    app.get('/api/listings', function (req, res) {
        Group.findOne({name: req.body.groupName}, function (err, group) {
            res.send(group.properties);
        });
    });

    app.post('/api/listings', function (req, res) {
        Group.findOne({name: req.body.groupName}, function (err, group) {
            group.properties.push(req.body.listing);
            group.save();
        })

    });

    app.delete('/api/listings', function (req, res) {
        Group.findOne({name: req.body.groupName}, function (err, group) {
            group.properties.forEach(function (listing, i) {
                if (listing.url === req.body.listing.url) { group.properties.splice(i, 1); }
                group.save();
            });
        });
    });

    app.post('/login', function (req, res) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (user) {
                res.send(user);
            } else {
                var groupName = "_priv_" + req.body.email;
                var newUser = new User({
                    name: req.body.name,
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

