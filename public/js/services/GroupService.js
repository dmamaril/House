app.factory('Members', function ($rootScope, $http) {
    var methods = {};

    methods.get = function () {
        return $http.get('/api/group', {
            _id: $rootScope.id, 
            groupName: $rootScope.groupName
        }).success(function (members) {
            return members;
        });
    };

    methods.post = function (groupName) {
        return $http.post('/api/group', {
            _id: $rootScope.id, 
            groupName: groupName
        }).success(function (members) {
            return members;
        });
    };

    methods.delete = function () {
        return $http.get('/api/group', {
            _id: $rootScope.id, 
            groupName: $rootScope.groupName
        }).success(function (members) {
            return members;
        });
    };

    return methods;
})
