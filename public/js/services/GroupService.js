app.factory('Groups', function ($rootScope, $http, User) {
    var updateMembers = function (members) {
        $rootScope.$emit('change:members', members);
    };

    var updateGroups = function (groups) {
        $rootScope.$emit('change:groups', groups);
    };

    $rootScope.$on('change:user', function() {
        Group.getMembers(User.currentGroup());
    });

    var Group = {};
    Group.createGroup = function(creator, groupName) {
        return $http.post('/api/group', {
            name: groupName,
            userId: creator._id
        }).success(updateGroups);
    };

    Group.removeGroupFromUser = function(user, group) {
        var id = group._id;
        var userId = user._id;
        return $http.delete('/api/group/' + id + '/users/' + userId)
            .success(updateGroups);
    };

    Group.getMembers = function(group) {
        var id = group._id;
        return $http.get('/api/group/' + id + '/users/')
            .success(updateMembers);
    };

    Group.emailInvite = function (groupId, email) {
        return $http.get('/invite/' + groupId + '/' + email);
    };

    return Group;
})
