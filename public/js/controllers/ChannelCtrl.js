app.controller('ChannelController', function ($scope, $rootScope, $location, Groups, User) {
    $scope.groupName = User.currentGroup().name;
    $scope.groups = User.get().map(function(group) {
        return group.name;
    });
    $scope.toJoin = '';

    $rootScope.$on('change:groups', function() {
        $scope.groups = User.get().map(function(group) {
            return group.name;
        });
    });

    $scope.checkActive = function(groupName) {
        if ($scope.groupName === groupName) { return 'subheading-active'; }
        return '';
    };

    $scope.remove = function (groupName) {
        User.removeGroup(groupName);
    };

    $scope.create = function () {
        Group.create(User.get(), $scope.toJoin);
        $scope.toJoin = '';
    };

    $scope.join = function () {
        Group.addUser(User.get(), $scope.toJoin);
        $scope.toJoin = '';
    };

    $scope.switch = function (groupName) {
        User.currentGroup(groupName);
        $scope.groupName = User.currentGroup().name;
    };
});