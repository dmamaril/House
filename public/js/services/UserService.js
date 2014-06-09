app.factory('User', function($http, $rootScope, $location) {
    var userProfile = {};
    var currentGroup;

    var updateCache = function (user) {
        userProfile = user;
        currentGroup = currentGroup || user.groups[0];
        $rootScope.$emit('change:user', user);
    };

    var User = {};

    User.fetch = function(id) {
        var id = id || userProfile._id;
        return $http.get('/api/user/' + id).success(updateCache);
    };

    User.get = function () { return userProfile; };
    
    User.set = function (userAttrs) {
        Object.keys(userAttrs).forEach(function(key) {
            userProfile[key] = userAttrs[key];
        });

        return $http.put('/api/user/' + userProfile._id, userProfile)
            .success(updateCache);
    };

    User.currentGroup = function(group) {
        if (arguments.length === 0) {
            return currentGroup;
        } else {
            currentGroup = group;
            return currentGroup;
        }
    };

    User.getId = function() { return userProfile._id; }

    return User;
});