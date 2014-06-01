app.factory('Listings', function ($http, $rootScope) {    
    var methods = {};

    var broadcast = function (listings) {
        $rootScope.$emit('change:listings', listings);
    };

    methods.get = function(groupName) {
        return $http.get('/api/listings', {
            groupName: groupName
        }).success(broadcast);
    };

    methods.post = function(listing) {
        return $http.post('/api/listings', {
            groupName: $rootScope.groupName,
            listing: listing
        }).success(broadcast);
    };

    methods.put = function(listing) {
        return $http.put('/api/listings', {
            groupName: $rootScope.groupName,
            listing: listing
        }).success(broadcast);
    };

    methods.delete = function(listing) {
        return $http.delete('/api/listings', {
            groupName: $rootScope.groupName,
            listing: listing
        }).success(broadcast);
    };

    return methods;
});
