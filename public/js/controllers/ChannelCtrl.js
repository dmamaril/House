app.controller('ChannelController', function ($scope, $rootScope, $location, Groups, User) {
    $scope.groupName = User.currentGroup().name;
    $scope.groups = User.get().groups;
    $scope.toJoin = '';

    $rootScope.$on('change:groups', function(event, data) {
        /* ON DELETE */
        if (data.groups) {
            $scope.groups.forEach(function (group, index) {
              if (data.groups.indexOf(group._id) === -1) { $scope.groups.splice(index, 1); }
            });
        /* ON CREATE */
        } else {
            $scope.groups.push(data);
        }
    });

    $scope.checkActive = function(groupName) {
        if ($scope.groupName === groupName) { return 'subheading-active'; }
        return '';
    };

    $scope.remove = function (group) {
        if (group !== $scope.groups[0]) {
            Groups.removeGroupFromUser(User.get(), group);
        }
    };

    $scope.create = function () {
        Groups.createGroup(User.get(), $scope.toJoin);
        $scope.toJoin = '';
    };

    $scope.join = function () {
        Groups.addUser(User.get(), $scope.toJoin);
        $scope.toJoin = '';
    };

    $scope.switch = function (group) {
        User.currentGroup(group);
        $scope.groupName = User.currentGroup().name;
    };
});