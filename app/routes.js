var jwt = require('jsonwebtoken');
var http = require('http-request');
var xml2js = require('xml2js');

// Mongoose Models
var User = require('./models/User.js');
var Group = require('./models/Group.js');
var Property = require('./models/Property.js');


var parseBnB = function (toParse, listingUrl) {
  var start = toParse.indexOf('<table class="table table-bordered table-striped" id="description_details" itemprop="breadcrumb">');
  var stop = toParse.indexOf('<td>Cancellation:</td>');
  var details = toParse.substring(start, stop);

  // PARSE MONTHLY PRICE
  start = details.indexOf('<td>Monthly Price:</td>');
  stop = details.indexOf('</span> /month');
  var monthlyPrice = details.substring(start, stop);
  monthlyPrice = monthlyPrice.slice(monthlyPrice.lastIndexOf('$')+1);

  // PARSE BEDROOMS
  start = details.indexOf('<td>Bedrooms:</td>');
  var bedrooms = details.substring(start, start+52)[details.substring(start, start+52).length-1];

  // PARSE NEIGHBORHOOD
  start = details.lastIndexOf("'>");
  var neighborhood = details.substring(start+1);
  neighborhood = neighborhood.substring(1, neighborhood.indexOf('<'));

  // PARSE COORDINATES
  start = toParse.indexOf('latitude" content="');
  stop = toParse.indexOf('<meta property="og:locale"');
  var coordinates = toParse.substring(start, stop).replace(/[A-Za-z$"]/g, "");
  var latitude = coordinates.substring(coordinates.indexOf('=')+1, coordinates.indexOf('>'));
  var longitude = coordinates.substring(coordinates.lastIndexOf('=')+1, coordinates.lastIndexOf('>'));
  coordinates = { latitude: latitude, longitude: longitude };

  // PARSE DAILYPRICE * 30
  if (!monthlyPrice) {
    start = toParse.indexOf('<div class="text-muted">From</div>');
    stop = toParse.indexOf('<meta content="USD"');
    var dailyPrice = toParse.substring(start, stop);
    dailyPrice = dailyPrice.substring(dailyPrice.lastIndexOf('$')+1, dailyPrice.lastIndexOf('</')) * 30;
    monthlyPrice = dailyPrice;
  };
    
  console.log({ listingUrl: listingUrl, coordinates: coordinates, neighborhood: neighborhood, bedrooms: bedrooms, monthlyPrice: monthlyPrice, votes: 0 });
  return { listingUrl: listingUrl, coordinates: coordinates, neighborhood: neighborhood, bedrooms: bedrooms, monthlyPrice: monthlyPrice, votes: 0 } ;

};

var parseCraigsList = function (toParse, listingUrl) {
  // PARSE NEIGHBORHOOD
  var start = toParse.indexOf('<h2 class="postingtitle">');
  var stop = toParse.indexOf('</h2>');
  var neighborhood = toParse.substring(start, stop);
  neighborhood = neighborhood.substring(neighborhood.lastIndexOf('(')+1, neighborhood.lastIndexOf(')'));

  // PARSE MAPS & BEDROOM
  start = toParse.indexOf('<div class="mapAndAttrs">');
  stop = toParse.indexOf('<section id="postingbody">');
  var mapAndAttrs = toParse.substring(start, stop);

  // MAP COORDINATES
  start = mapAndAttrs.indexOf('data-latitude="');
  stop = mapAndAttrs.indexOf('data-longitude="') + 30;
  var coordinates = findCoordsCL(mapAndAttrs.substring(start, stop).replace(/[A-Za-z$]/g, ""));

  // NUMBER OF BEDROOMS
  mapAndAttrs = mapAndAttrs.substring(mapAndAttrs.indexOf('<p class="attrgroup"'), mapAndAttrs.lastIndexOf('</b>BR'));
  var bedrooms = mapAndAttrs.slice(mapAndAttrs.lastIndexOf('>')+1);

  // MONTHLY PRICE
  var monthlyPrice = toParse.substring(toParse.indexOf('&#x0024;'), toParse.indexOf('&#x0024;') + 20);
  monthlyPrice = monthlyPrice.substring(monthlyPrice.indexOf(';')+1, monthlyPrice.indexOf('/')-1);
 
  console.log({ listingUrl: listingUrl, coordinates: coordinates, neighborhood: neighborhood, bedrooms: bedrooms, monthlyPrice: monthlyPrice, votes: 0 });
  return { listingUrl: listingUrl, coordinates: coordinates, neighborhood: neighborhood, bedrooms: bedrooms, monthlyPrice: monthlyPrice, votes: 0 };
};

var findCoordsCL = function (coordinates) {
    var temp = [];
    for (var i = 0 ; i < coordinates.length ; i++) {
      if (coordinates[i] === '"') {
        for (var j = i+1; j < coordinates.length ; j++) {
          if (coordinates[j] === '"') {
            temp.push(coordinates.substring(i+1, j));
            i = j;
            break;
          }
        }
      }
    }
    if (temp[0].length === 0) { temp[0] = undefined; }
    return { latitude: temp[0], longitude: temp[1] };
};



module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests

  app.get('/api/user', function (req, res) {
    User.findOne({ _id: req.user.id }, function (err, user) {
      if (!err) {
        console.log('/api/user has found ', user.name);
        res.send(user);
      } else {
        res.send(501, err);
      }
    });
  });

  app.post('/api/user', function (req, res) {
    User.findOne({ _id: req.user.id }, function (err, user) {
      if (user) {
        user.name = req.body.name;
        user.budget = req.body.budget;
        user.location = req.body.location;
        user.prefDistance = req.body.prefDistance;
      }
      user.save(function (err, savedUser) {
        console.log (savedUser, 'Successfully saved!');
      });
    });
  });

  app.get('/api/group', function (req, res) {
    User.findOne({ _id: req.user.id }, function (err, user) {
      if (user.hasOwnProperty('groupId')) {
        console.log('Found user.groupId', user.groupId)
        Group.findOne({ _id: user.groupId }, function (err, group) {
          var members;
          if (group) {
            members = group.members;
            members.forEach(function (member) {
              delete member.password;
            });
            console.log('Sending members: ', members);
            res.send(members);
          } else {
            res.send(501, err);
          }
        });
      } else {
        res.send([]);
      }
    });
  });

  app.post('/api/group', function (req, res) {
    
    var updateUser = function (savedGroup, userId) {
      console.log('Searching for user...', userId);
      User.update({ _id: userId }, { $set: { groupId: savedGroup._id }}, function () {
        User.findOne({ _id: userId }, function (err, user) {
          console.log('Saved!', user);
        }); 
      });
    };

    console.log('Checking for groupName: ', req.body.groupName);
    Group.findOne({ groupName: req.body.groupName }, function (err, group) {
      if (!group) {
        console.log(req.body.groupId, ' Not found. Creating a new group...')
        var newGroup = new Group();
        newGroup.members.push(req.user.id);
        newGroup.groupName = req.body.groupName;
        console.log('Creating group...', newGroup)
        newGroup.save(function(err, savedGroup, numberAffected) {
          updateUser(savedGroup, req.user.id);
          res.end();
        });
      } else if (group) {
        group.members.push(req.user.id);
        group.save(function(err, savedGroup, numberAffected) {
          console.log('Updated existing group: ', savedGroup);
          updateUser(savedGroup, req.user.id);
          res.end();
        });
      }
    });
  });

  app.get('/api/property', function (req, res) {
    console.log('Current user: ', req.user);
    User.findOne({ _id: req.user.id }, function (err, user) {
      console.log('User groupID: ', user.groupId)
      if (user.groupId) {
        Group.findOne({ _id: user.groupId }, function (err, group) {
          console.log(group.members.length, ' members found for this group');
          var propertiesAndGroupLocation = {
            properties: [], 
            groupLocation: group.groupLocation
          };
          group.members.forEach(function (memberId) {
            console.log('Searching for user ', memberId);
            User.findOne({ _id: memberId }, function (err, user) {
                console.log('Found user. Adding properties from', user.properties);
                user.properties.forEach(function (property) {
                  propertiesAndGroupLocation.properties.push(property);
                });
                res.send(propertiesAndGroupLocation);
            });
          });
        });
      } else {
        res.send([]);
      }
    });
  });

  app.post('/api/property', function (req, res) {
    var newProperty = new Property();
    newProperty.url = req.body.url;
    newProperty.title = req.body.title;
    newProperty.location = req.body.location;
    newProperty.price = req.body.price;
    newProperty.votes = 0;

    newProperty.save();
  });

  app.post('/register', function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
      console.log('Checking if email exists...', !user);
      if (!user) {
        console.log('Creating new user...');
        var newUser = new User ({
          email: req.body.email,
          name: req.body.name,
          password: req.body.password
        });
        newUser.save(function (err, user){
          console.log('Saving user...' );
          console.log(user);
          console.log('Saved!');
          res.send(user);
        });
      }
    });
  });

  app.post('/login', function (req, res) {
    console.log('Logging in as ', req.body.email);
    User.findOne({email: req.body.email}, function (err, user) {
      if (user) {
        console.log('User found. Checking password....');
        user.comparePassword(req.body.password, function (isMatch) {
          if (isMatch) {
            console.log('Password matched! Creating token...')
            var tokenProfile = {
              name: user.name,
              email: user.email,
              id: user._id
            };
            console.log(user.name + ' has successfully logged in.');
            var token = jwt.sign(tokenProfile, 'houseApp', {expiresInMinutes: 20});
            res.json({token:token, _id: user._id, user: user.name});
          } else {
            res.send(401, 'Wrong user or password');
          }
        });
      } else {
        console.log ('Error @ /login routes.js');
      }
    });
  });

  app.post('/api/fetchListing', function (req, res) {
    console.log('Fetching listing at ', req.body.listingUrl);
    http.get(req.body.listingUrl, function (err, response) {
      if (req.body.listingUrl.indexOf('craigslist') !== -1) { res.send(parseCraigsList(response.buffer.toString(), req.body.listingUrl)); }
        else { res.send(parseBnB(response.buffer.toString(), req.body.listingUrl )); }
    });
  });

  app.post('/api/addListingToUserProperties', function (req, res) {
    console.log(req.user.id, 'addListingToUserProperties')
    User.update({ _id: req.user.id }, { $push: { properties: req.body }}, function () {
      User.findOne({ _id: req.user.id }, function (err, user) {
        console.log('Property ', req.body, ' saved!', user);
        res.send(user.properties);
      }); 
    });
  });


  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  next();
});

};

