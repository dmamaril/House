app.controller('ChannelController', function ($scope, $rootScope, $location, Groups, User) {
    $scope.groupName = $rootScope.groupName;
    $scope.groups = $rootScope.user.groups;
    $scope.toJoin = '';

    $rootScope.$on('change:channel', function(event, newChannel) {
        $scope.groupName = newChannel;
    });
    $rootScope.$on('change:user', function(event, user) {
        $scope.groups = $rootScope.user.groups;
    });

    $scope.checkActive = function(groupName) {
        if ($scope.groupName === groupName) { return 'subheading-active'; }
        return '';
    };

    $scope.remove = function (groupName) {
        User.removeGroup(groupName);
    };

    $scope.join = function () {
        User.addGroup(toJoin);
    };

    $scope.switch = function (groupName) {
        $rootScope.groupName = groupName;
        $rootScope.$emit('change:channel', $rootScope.groupName);
        $location.path('/groups'); // force reinstantiation of controller
    };
});