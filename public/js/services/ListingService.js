app.factory('Listings', function ($http) {    
    var methods = {};

    methods.get = function(groupName) {
        return $http.get('/api/listings', {
            groupName: groupName
        }).success(function (listing) {
            return listing;
        });
    };

    methods.post = function(listing) {
        return $http.post('/api/listings', {
            listing: listing
        }).success(function (listing) {
            return listing;
        });
    };

    methods.delete = function(listing) {
        return $http.delete('/api/listings', {
            listing: listing
        }).success(function (listing) {
            return listing;
        });

    };
});
