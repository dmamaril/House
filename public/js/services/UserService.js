app.factory('User', function($http, $rootScope) {
    var methods = {};

    var broadcast = function (user) {
        $rootScope.$emit('change:user', user);
    };

    methods.get = function() {
        return $http.get('/api/user', {
            _id: $rootScope.user._id
        }).success(function (user) {
            $rootScope.user = user;
            broadcast(user);
        });
    };

    methods.edit = function(user) {
        return $http.post('/api/user', {
            _id: $rootScope.user._id,
            name: user.name,
            budget: user.budget,
            location: user.location
            prefDistance: user.prefDistance,
            groups: user.groups
        }).success(function (user) {
            $rootScope.user = user;
            broadcast(user);
        });
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

    return methods;
});