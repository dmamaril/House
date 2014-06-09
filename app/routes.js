var http = require('http-request');
var LinkParser = require('./linkParser.js')

var User = require('./models/User.js');
var Group = require('./models/Group.js');
var Listing = require('./models/Listing.js');

var Authentication = require('./authentication.js');

module.exports = function(app, passport) {
    /* === MAIN ROUTES === */
    app.get('/api/user/:id', function (req, res) {
        User.findOne({_id: req.params.id})
        .populate('groups')
        .exec(function (err, user) {
            if (user) {
                res.send(user);
            } else {
                res.send(501, err);
            }
        });
    });

    app.put('/api/user/:id', Authentication.check, function (req, res) {
        User.findOne({_id: req.params.id})
        .populate('groups')
        .exec(function (err, user) {
            console.log(req.body);
            if (user) {
                if (req.body.budget) { user.budget = req.body.budget };
                if (req.body.location) { user.location = req.body.location };
                if (req.body.prefDistance) { user.prefDistance = req.body.prefDistance };
                user.save(function (err, savedUser) {
                    console.log(savedUser, 'Successfully saved!');
                });
                res.send(user);
            } else {                
                res.send(400, 'User Already Exists')
            }
        });
    });

    app.post('/api/group', Authentication.check, function (req, res) {
        var newGroup = new Group({
            name: req.body.name
        });
        newGroup.save(function (err, newGroup) {
            User.findOne({_id: req.body.userId}, function (err, user) {
                user.groups.push(newGroup._id);
                user.save(function(err, user) {
                    console.log(req.body.name, ' saved to ', user.google.name, "'s groups.");
                    res.send(newGroup);
                });
            });
        });
    });

    app.get('/api/group/:id/users', function (req, res) {
        User.find({groups: req.params.id}, function (err, users) {
            res.send(users);
        });
    });


    app.get('/api/group/:id/listings', Authentication.check, function (req, res) {
        Listing.find({group: req.params.id})
        .populate('group')
        .exec(function (err, listings) {
            res.send(listings);
        });
    });

    app.post('/api/group/:id/listings', function (req, res) {
        console.log('Receiving request', req.body.url);
        var newListing = new Listing({
            group: req.params.id
        })

        var extendNewProp = function (parseResult) {
            for (var prop in parseResult) {
                newListing[prop] = parseResult[prop];
            }
        };

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
            newListing.save(function(err) {
                if (err) { res.send(501, err); }
                Listing.find({group: req.params.id}, function (err, listings){
                    console.log(listings, ' saved.');
                    res.send(listings);
                });
            });
        });
    });


    app.delete('/api/group/:id/listings/:listingId', Authentication.check, function (req, res) {
        Listing.findOne({_id: req.params.listingId}, function (err, listing) {
            listing.remove();
            Listing.find({group: req.params.id}, function (err, listings) {
                res.send(listings);
            })
        });
    });

    app.put('/api/group/:id/users/:userId', Authentication.check, function (req, res) {
        User.findOne({_id: req.params.userId}, function (err, user) {
            user.groups.push(req.params.id);
            user.save(function(err){
                if (err) {return err;}
                res.send(user);
            });
        });
    });

    app.delete('/api/group/:id/users/:userId', function (req, res) {
        User.findOne({_id: req.params.userId}, function (err, user) {
            user.groups.remove(req.params.id);
            user.save(function(err) {
                if (err) {return err;}
                res.send(user);
            });
        });
    });


    /* === DEFAULT === */
    app.get('*', Authentication.check, function(req, res) {
        res.sendfile('./public/index.html');
    });
};