app.factory('Groups', function ($rootScope, $http) {
    var methods = {};

    var broadcast = function (group) {
        $rootScope.$emit('change:group', group.members);
    };

    methods.get = function () {
        return $http.get('/api/group', {
            params: {
                id: $rootScope.user._id, 
                groupName: $rootScope.groupName
            }
        }).success(broadcast);
    };

    return methods;
})
