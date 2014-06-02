app.controller('MapController', function ($scope, User) {
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

    $scope.map = {};
    $scope.map.center = { latitude: 37.7749295, longitude: -122.4194155};
    $scope.map.zoom = 12;
    $scope.map.options = {
        streetViewControl: false,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        styles: mapSettings
    };
});