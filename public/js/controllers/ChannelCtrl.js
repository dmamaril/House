app.controller('ChannelController', function ($scope, $rootScope, $location, Groups, User, Listings) {
    $scope.groupName = User.currentGroup().name;
    $scope.groups = User.get().groups;
    $scope.toJoin = '';

    User.currentGroup().isClicked = true;

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

    $scope.remove = function (group) {
        if (group !== $scope.groups[0]) {
            Groups.removeGroupFromUser(User.get(), group);
        }
    };

    $scope.create = function () {
        Groups.createGroup(User.get(), $scope.toJoin);
        $scope.toJoin = '';
    };

    $scope.emailInvite = function () {
        Groups.emailInvite(User.currentGroup()._id, $scope.emailToInvite);
    };

    $scope.switch = function (group) {
        User.currentGroup().isClicked = false;
        $scope.groupName = User.currentGroup(group).name;
        group.checkActive = 'subheading-active';
        group.isClicked = true;
        Listings.getByGroup(User.currentGroup());
        Groups.getMembers(User.currentGroup());
    };
});