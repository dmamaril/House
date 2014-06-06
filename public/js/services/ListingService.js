app.factory('Listings', function ($http, $rootScope, Maps) {    

    var updateCache = function (listings) {
        $rootScope.$emit('change:listings', listings);
    };

    var Listings = {};

    Listings.create = function (groupObj, url) {
        var groupId = groupObj._id;
        return $http.post('/api/group/' + groupId + '/listings', {
            url: url
        }).success(updateCache);
    };

    Listings.remove = function (id) {
        return $http.delete('/api/listings/' + id)
            .success(updateCache);
    };

    Listings.getByGroup = function (groupObj) {
        var id = groupObj._id;
        return $http.get('/api/group/' + id + '/listings')
            .success(updateCache);
    };

    return Listings;
});
