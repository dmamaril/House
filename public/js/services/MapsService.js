app.factory('Maps', function () {
    var geocoder = new google.maps.Geocoder();
    var methods = {};

    methods.geocode = function (address, callback) {
        geocoder.geocode({'address': address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var location = results[0].geometry.location;
                console.log("Location from geocoder obtained:", location.k, location.A);
                callback([location.k, location.A]);
            } else {
                console.log("Unable to obtain coordinates from geocoding");
            }
        });
    };

    methods.distance = function (coord1, coord2) {
        var _coord1 = new google.maps.LatLng(coord1[0], coord1[1]);
        var _coord2 = new google.maps.LatLng(coord2[0], coord2[1]);
        var distance = google.maps.geometry.spherical.computeDistanceBetween(_coord1, _coord2);
        return distance;
    };

    return methods;
});