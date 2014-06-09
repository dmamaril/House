app.controller('MapController', function ($scope, $rootScope, User) {
    $scope.properties = $scope.listings;
    $rootScope.$on('change:listings', function(event, listings) {
        $scope.properties = listings;
        updateMarkers();
    });

    // HACK: ng-map directive seems to interfere with CSS styling?
    var _div = document.getElementById('map-canvas');
    _div.style.height = (window.innerHeight - 75).toString() + 'px';

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
    var markers = [];
    var initMap = function () {
        var SF = new google.maps.LatLng(37.7749295, -122.4194155);
        // geocoder = new google.maps.Geocoder();
        var mapOptions = {
            streetViewControl: false,
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            zoom: 12,
            center: SF,
            styles: mapSettings
        }
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    };
    initMap();

    var updateMarkers = function () {
        for (var i = 0; i < markers.length; i++) { markers[i].setMap(null); }
        for (var j = 0; j < $scope.properties.length; j++) {
            (function (j) {
                var latLng = new google.maps.LatLng($scope.properties[j].location[0].latitude, $scope.properties[j].location[0].longitude);
                var marker = new google.maps.Marker({
                    position: latLng,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillOpacity: 0.8,
                        fillColor: '#CBE3B0',
                        strokeOpacity: 1,
                        strokeColor: '#556651',
                        strokeWeight: 3,
                        scale: 15
                    },
                    map: map,
                    title: 'Hello World!'
                });

                var price = $scope.properties[j].price;
                var rooms = $scope.properties[j].rooms;
                var title = $scope.properties[j].title;
                var link = $scope.properties[j].url;
                var template = "<span class='listing-address listing-map-font'><a target='_blank' href=" + link + ">" + title + "</a></span><br>"
                    + "<span class='listing-currency listing-map-font'>$ </span><span class='listing-cost listing-map-font'>" + price + " </span>"
                    + "<span class='listing-rooms listing-map-font'> (" + rooms + " BR)</span>";
                var infoWindow = new google.maps.InfoWindow({
                    content: template
                });
                google.maps.event.addListener(marker, 'click', function() {
                    infoWindow.open(map, marker);
                    markers.push(infoWindow);
                });

                markers.push(marker);      
            })(j);
        }
    };
});

