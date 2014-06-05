app.factory('User', function($http, $rootScope, $location) {
    var methods = {};

    var broadcast = function (user) {
        $rootScope.user = user;
        $rootScope.groupName = user.groups[0].name;
        $rootScope.$emit('change:user', user);
    };

    methods.get = function() {
        return $http.get('/api/user/:id').success(broadcast);
    };

    methods.fetch = function() {
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