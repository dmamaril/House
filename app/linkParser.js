var methods = {};

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

methods.airbnb = function (toParse, listingUrl) {
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
  }

  return { 
    title: neighborhood,
    url: listingUrl,
    location: coordinates,
    rooms: bedrooms,
    price: monthlyPrice,
    votes: []
  };
};

methods.craigslist = function (toParse, listingUrl) {
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
 
  return { 
    title: neighborhood,
    url: listingUrl,
    location: coordinates,
    rooms: bedrooms,
    price: monthlyPrice,
    votes: []
  };
};

module.exports = methods;