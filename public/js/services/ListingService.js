app.factory('Listings', function ($http, $rootScope, Maps, $location, User) {    

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

    Listings.remove = function (groupObj, id) {
        var groupId = groupObj._id;
        return $http.delete('/api/group/' + groupId + '/listings/' + id)
            .success(updateCache);
    };

    Listings.getByGroup = function (groupObj) {
        var id = groupObj._id;
        return $http.get('/api/group/' + id + '/listings')
            .success(updateCache);
    };

    Listings.logout = function () {
        var user = User.get();
        return $http.get('/unlink/google/' + user._id)
            .success(function () {
                console.log('You have been logged out!');
                $location.path('/');
            });
    };

    return Listings;
});
