app.factory('Groups', function ($rootScope, $http) {
    var updateMembers = function (members) {
        $rootScope.$emit('change:members', members);
    };
    var updateGroups = function (groups) {
        $rootScope.$emit('change:groups', groups);
    };

    var Group = {};
    Group.create = function(creator, groupName) {
        return $http.post('/api/group', {
            name: groupName,
            userId: creator._id
        }).success(updateCache);
    };

    Group.addUser = function(user, group) {
        var id = group._id;
        var userId = user._id;
        return $http.put('/api/group/' + id + '/users/' + userId)
            .success(updateCache);
    };

    Group.removeUser = function(user, group) {
        var id = group._id;
        var userId = user._id;
        return $http.delete('/api/group/' + id + '/users/' + userId)
            .success(updateCache);
    };

    Group.getMembers = function(group) {
        var id = group._id;
        return $http.get('/api/group/' + id + '/users/')
            .success(updateCache);
    };

    return Group;
})
