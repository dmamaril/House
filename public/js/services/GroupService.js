app.factory('Groups', function ($rootScope, $http) {
    var methods = {};

    var broadcast = function (members) {
        $rootScope.$emit('change:group', members);
    };

    methods.get = function () {
        return $http.get('/api/group', {
            _id: $rootScope.user._id, 
            groupName: $rootScope.groupName
        }).success(broadcast);
    };

    methods.post = function (groupName) {
        return $http.post('/api/group', {
            _id: $rootScope.user._id, 
            groupName: groupName
        }).success(broadcast);
    };

    methods.delete = function (groupName) {
        return $http.get('/api/group', {
            _id: $rootScope.user._id, 
            groupName: groupName
        }).success(broadcast);
    };

    return methods;
})
