var http = require('http-request');
var LinkParser = require('./linkParser.js')

// Mongoose Models
var User = require('./models/User.js');
var Group = require('./models/Group.js');
var Listing = require('./models/Listing.js');

module.exports = function(app) {
    app.get('/api/test', function (req, res) {
        console.log(req);
        res.send(req);
    }),

    //gets a user, requires user id
    app.get('/api/user/:id', function (req, res) {
        User.findOne({_id: req.params.id}, function (err, user) {
            if (user) {
                res.send(user);
            } else {
                res.send(501, err);
            }
        });
    });

    //edits a user. TODO: how to handle groups
    app.put('/api/user', function (req, res) {
        User.findOne({id: req.body.id}, function (err, user) {
            if (!user) {
                res.send(400, 'User does not exist.');
            } else {                
                user.name = req.body.name;
                user.budget = req.body.budget;
                user.location = req.body.location;
                user.prefDistance = req.body.prefDistance;
                user.groups = req.body.groups;
                user.save(function (err, savedUser) {
                    console.log(savedUser, 'Successfully saved!');
                });
                res.send(user);
            }
        });
    });

    //Give a group ID and get a group back
    app.get('/api/group/:id', function (req, res) {
        Group.findOne({_id: req.params.id}, function (err, group) {
            console.log("Sending back group...", group);
            res.send(group);
        });
    });

    //used to be look for group and get locations.
    app.get('/api/listings/:groupId', function (req, res) {
        Listing.find({group: req.params.groupId}, function (err, listings) {
            res.send(group.listings);
        });
    });

    //post a listing, requires a url and a groupId
    app.post('/api/listings', function (req, res) {
        var newListing = new Listing({
            group: req.body.groupId //TODO: Agree on name for the req
        })

        var extendNewProp = function (parseResult) {
            for (var prop in parseResult) {
                newListing[prop] = parseResult[prop];
            }
        }
        http.get(req.body.url, function (err, response) {
            var listing;
            if (req.body.url.indexOf('craigslist') > -1) { 
                listing = LinkParser.craigslist(response.buffer.toString(), req.body.url);
                extendNewProp(listing); 
            } else if (req.body.url.indexOf('airbnb') > -1) {
                listing = LinkParser.airbnb(response.buffer.toString(), req.body.url);
                extendNewProp(listing);
            } else {
                res.send(501);
                return null;
            }
            newListing.save(); //TODO: error handing
            res.send(listing); //figure out what we're returning
        })
    });


    //delete a listing. give it a listing id.
    app.delete('/api/listings/:id', function (req, res) {
        Listing.findOne({_id: req.params.id}, function (err, listing) {
            listing.remove();
            res.send('success');
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