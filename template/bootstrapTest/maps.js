var mapSettings = [
  {
    "featureType": "poi",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi",
    "stylers": [
      { "visibility": "on" },
      { "color": "#d6dfd0" }
    ]
  },{
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "color": "#40BC98" }
    ]
  },{
    "elementType": "labels.text.stroke",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "elementType": "labels.text",
    "stylers": [
      { "weight": 0.1 },
      { "visibility": "on" },
      { "color": "#556651" }
    ]
  },{
    "elementType": "labels.icon",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      { "color": "#EEF0EE" }
    ]
  },{
    "featureType": "transit",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#40BC98" }
    ]
  },{
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      { "color": "#a4b1a0" }
    ]
  }
];

var map;
var initMap = function () {
    var SF = new google.maps.LatLng(37.7749295, -122.4194155);
    var mapOptions = {
        streetViewControl: false,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        zoom: 12,
        center: SF,
        styles: mapSettings
    }
    map = new google.maps.Map(document.getElementById('listings-canvas'), mapOptions);
};
google.maps.event.addDomListener(window, 'load', initMap);