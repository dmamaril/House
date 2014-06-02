app.factory('User', function($http, $rootScope, $location) {
    var methods = {};

    var broadcast = function (user) {
        $rootScope.user = user;
        $rootScope.$emit('change:user', user);
    };

    methods.get = function() {
        return $http.get('/api/user', {
            params: {id: $rootScope.user._id}
        }).success(broadcast);
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

    methods.login = function (email) {
        return $http.post('/login', { email: email })
            .success(function(user) {
                console.log(user);
                $rootScope.user = user;
                $rootScope.groupName = user.groups[0];
                $location.path("/listings");
            });
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