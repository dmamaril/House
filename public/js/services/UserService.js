app.factory('User', function($http, $rootScope, $location) {
    var userProfile = {};
    var currentGroup = '';

    var broadcast = function (user) {
        userProfile = user;
        $rootScope.groupName = user.groups[0].name;
        $rootScope.$emit('change:user', user);
    };

    var methods = {};

    methods.fetch = function() {
        return $http.get('/api/user/:id').success(broadcast);
    };

    methods.attr = function(userAttrs) {
        if (arguments.length === 0) { // GET
            return userProfile;
        } else { // SET
            Object.keys(userAttrs).forEach(function(key) {
                
            });
        }
    };


    methods.get = function() {
        return $http.get('/api/user/:id').success(broadcast);
    };


    methods.edit = function(user) {
        return $http.post('/api/user', {
            id: $rootScope.user._id,
            name: user.name,
            budget: user.budget,
            location: user.location,
            prefDistance: user.prefDistance,
            groups: user.groups
        }).success(broadcast);
    };

    methods.addGroup = function (groupName) {
        return $http.post('/api/group', {
            id: $rootScope.user._id, 
            groupName: groupName
        }).success(broadcast);
    };

    methods.removeGroup = function (groupName) {
        return $http.get('/api/group', {
            params: {
                id: $rootScope.user._id, 
                groupName: groupName
            }
        }).success(broadcast);
    };

    return methods;
});