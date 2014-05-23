var map = {};

map.initialize = function (startingLat, startingLong, locId, zoom) {
  zoom = zoom || 13;
  var myLatLng = new google.maps.LatLng(startingLat, startingLong);  
  var mapOptions = {
    zoom: 13,
    center: myLatLng
  }
  this.map = new google.maps.Map(document.getElementById(locId), mapOptions);
};

map.addMarker = function(lat, long) {
  var position = new google.maps.LatLng(+lat,+long);
  var marker = new google.maps.Marker({
      position: position,
      map: this.map
  });
}