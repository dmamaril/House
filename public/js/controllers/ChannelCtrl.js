app.controller('ChannelController', function ($scope, $rootScope, $location, Groups, User) {
    $scope.groupName = User.currentGroup().name;
    $scope.groups = User.get().groups;
    $scope.toJoin = '';

    $rootScope.$on('change:groups', function() {
        $scope.groups = User.get().groups.map(function(group) {
            return group.name;
        });
    });

    $scope.checkActive = function(groupName) {
        if ($scope.groupName === groupName) { return 'subheading-active'; }
        return '';
    };

    $scope.remove = function (group) {
        Groups.removeGroupFromUser(User.get(), group);
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