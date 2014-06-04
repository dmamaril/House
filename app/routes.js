var http = require('http-request');
var LinkParser = require('./linkParser.js')

var User = require('./models/User.js');
var Group = require('./models/Group.js');
var Listing = require('./models/Listing.js');

var checkAuth = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = function(app, passport) {
    /* === MAIN ROUTES === */
    app.get('/api/user/:id', checkAuth, function (req, res) {
        User.findOne({_id: req.user._id})
        .populate('groups')
        .exec(function (err, user) {
            if (user) {
                res.send(user);
            } else {
                res.send(501, err);
            }
        });
    });

    app.put('/api/user/:id', checkAuth, function (req, res) {
        User.findOne({_id: req.params.id}, function (err, user) {
            if (user) {
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

    app.get('/api/group/:id', checkAuth, function (req, res) {
        Group.findOne({_id: req.params.id}, function (err, group) {
            res.send(group);
        });
    });


    app.get('/api/group/:groupId/listings', checkAuth, function (req, res) {
        Listing.find({group: req.params.groupId})
        .populate('group')
        .exec(function (err, listings) {
            res.send(listings);
        });
    });

    app.post('/api/listings', checkAuth, function (req, res) {
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


    app.delete('/api/listings/:id', checkAuth, function (req, res) {
        Listing.findOne({_id: req.params.id}, function (err, listing) {
            listing.remove();
            res.send('success');
        });
    });

    app.put('/api/group/:groupId/users/:userId', checkAuth, function (req, res) {
        User.findOne({_id: req.params.userId}, function (err, user) {
            user.groups.push(req.params.groupId);
            user.save(function(err){
                if (err) {return err;}
                res.send(user);
            });
            res.send('success');
        });
    });

    //TODO: remove group
    // app.delete('/api/group/:groupId/users/:userId', function (req, res) {
    //     User.findOne({_id: req.params.userId}, function (err, user) {
    //         user.groups.push(req.params.groupId);
    //         user.save(function(err){
    //             if (err) {return err;}
    //             res.send(user);
    //         });
    //         res.send('success');
    //     });
    // });

    app.post('/api/group', checkAuth, function (req, res) {
        var newGroup = new Group({
            name: req.body.name
        })
        newGroup.save(function (err) {
            User.findOne({_id: req.body.userId}, function (err, user) {
                user.groups.push(newGroup);
                user.save(function(err) {
                    res.send(newGroup);
                });
            });
        });
    });

    /* === AUTHENTICATION === */
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/groups',
            failureRedirect : '/'
        })
    );

    app.get('/unlink/google', function(req, res) {
        console.log('helloo');
        req.logout();
        req.redirect('/')
        var user = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            console.log(user, ' has been successfully logged out.');
            res.redirect('/');
        });
    });

    app.get('/groups', checkAuth);
    app.get('/listings', checkAuth);


    /* === DEFAULT === */
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};