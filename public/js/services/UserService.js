app.factory('User', function($http) {
    var methods = {};

    methods.get = function() {
        return $http.get('/api/user', {
            _id: $rootScope.id
        }).success(function (user) {
            return user;
        });
    };

    methods.post = function(user) {
        return $http.post('/api/user', {
            _id: $rootScope.id,
            name: user.name,
            budget: user.budget,
            location: user.location
            prefDistance: user.prefDistance,
            groups: user.groups
        }).success(function (user) {
            return user;
        });
    };

    return methods;
});