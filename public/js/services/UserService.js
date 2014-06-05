app.factory('User', function($http, $rootScope, $location) {
    var userProfile = {};
    var currentGroup = {};
    var isInitialized = false;

    var updateCache = function (user) {
        userProfile = user;
        $rootScope.$emit('change:user', user);
    };

    var User = {};

    User.init = function(id) {
        return $http.get('/api/user/:' + id).success(function(user) {
            console.log("Initialized! ", user);
            isInitialized = true;
            currentGroup = users.groups[0];
            updateCache(user);
        });
    };

    User.fetch = function() {
        return $http.get('/api/user/:' + id).success(updateCache);
    };

    User.get = function () {
        return userProfile;
    };

    User.set = function (userAttrs) {
        Object.keys(userAttrs).forEach(function(key) {
            userProfile[key] = userAttrs[key];
        });

        return $http.post('/api/user/:' + userProfile._id, {
            params: userProfile
        }).success(updateCache);
    };

    User.currentGroup = function(groupName) {
        if (arguments.length === 0) {
            return currentGroup;
        } else {
            userProfile.groups.forEach(function(group) {
                if (groupName === group.name) {
                    currentGroup = group;
                }
            });
            return currentGroup;
        }
    };

    User.isInitialized = function() {
        return isInitialized;
    };

    return User;
});