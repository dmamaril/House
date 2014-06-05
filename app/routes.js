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
        User.findOne({_id: req.params.id})
        .populate('groups')
        .exec( function (err, user) {
            if (user) {
                res.send(user);
            } else {
                res.send(501, err);
            }
        });
    });

    //edits a user. TODO: how to handle groups
    app.put('/api/user/:id', function (req, res) {
        User.findOne({_id: req.params.id}, function (err, user) {
            if (user) {
                if(req.params.name) {user.name = req.params.name};
                if(req.params.budget) {user.budget = req.params.budget};
                if(req.params.location) {user.location = req.params.location};
                if(req.params.prefDistance) {user.prefDistance = req.params.prefDistance};
                user.save(function (err, savedUser) {
                    console.log(savedUser, 'Successfully saved!');
                });
                res.send(user);
            } else {                
                res.send(400, 'User Already Exists')
            }
        });
    });

    app.get('/api/getTestUser', function (req, res) {
        var newUser = new User();
            newUser.set('name', 'testSuite');
            newUser.set('email', 'test@gmail.com');
            newUser.set('prefDistance', '50');
            newUser.set('budget', 4000);
            newUser.set('location', [10,20]); // lat & long
            newUser.save(function(err) {
            if(err){console.log(err);}
            res.send(newUser);
        });
    });

    //Give a group ID and get a group back
    app.get('/api/group/:id', function (req, res) {
        Group.findOne({_id: req.params.id}, function (err, group) {
            res.send(group);
        });
    });

    app.get('/api/group/:id/users', function (req, res) {
        User.find({groups: req.params.id}, function (err, users) {
            res.send(users);
        });
    });

    app.get('/api/group/:groupId/listings', function (req, res) {
        Listing.find({group: req.params.groupId})
        .populate('group')
        .exec(function (err, listings) {
            console.log(err);
            res.send(listings);
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
            res.send(newListing); //figure out what we're returning
        })
    });


    app.delete('/api/listings/:id', function (req, res) {
        Listing.findOne({_id: req.params.id}, function (err, listing) {
            listing.remove();
            res.send('success');
        });
    });

    app.put('/api/group/:groupId/users/:userId', function (req, res) {
        User.findOne({_id: req.params.userId}, function (err, user) {
            user.groups.push(req.params.groupId);
            user.save(function(err){
                if (err) {return err;}
                res.send(user);
            });
        });
    });

    app.delete('/api/group/:groupId/users/:userId', function (req, res) {
        console.log(req.params.userId);
        User.findOne({_id: req.params.userId}, function (err, user) {
            user.groups.remove(req.param.groupId);
            user.save(function(err) {
                if (err) {return err;}
                res.send(user);
            });
        });
    });

    // (@name, @userId)
    app.post('/api/group', function (req, res) {
        var newGroup = new Group({
            name: req.body.name
        })
        newGroup.save(function (err) {
            User.findOne({_id: req.body.userId}, function (err, user) {
                if(err) {console.log(err)};
                user.groups.push(newGroup);
                user.save(function(err) {
                    if(err){console.log(err)}
                    console.log(newGroup);
                    res.send(newGroup);
                });
            });
        });
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};

