app.factory('Listings', function ($http, $rootScope) {    
    var methods = {};

    var broadcast = function (listings) {
        var mapped = listings.map(function(listing, i) {
            listing.id = i;
            return listing;
        }); // google maps plugin requires object.id to be present
        $rootScope.$emit('change:listings', mapped);
    };

    methods.get = function(groupName) {
        return $http.get('/api/listings')
            .success(function (data) {
                console.log(data);
        });
    };

    methods.post = function(url) {
        return $http.post('/api/listings', {
            groupName: $rootScope.groupName,
            url: url
        }).success(broadcast);
    };

    methods.put = function(listing) {
        return $http.put('/api/listings', {
            params: {
                groupName: $rootScope.groupName,
                listing: listing
            }
        }).success(broadcast);
    };

    methods.delete = function(listing) {
        return $http.delete('/api/listings', {
            params: {
                groupName: $rootScope.groupName,
                listing: listing
            }
        }).success(broadcast);
    };

    return methods;
});
