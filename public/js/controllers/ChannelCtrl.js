app.controller('ChannelController', function ($scope, Groups) {
    $scope.groupName = $rootScope.groupName;
    $rootScope.$on('change:channel', function(event, newChannel) {
        $scope.groupName = newChannel;
    });

    $scope.remove = function (groupName) {
        Groups.delete(groupName);
    };

    $scope.join = function (groupName) {
        Groups.post(groupName);
    };

    $scope.switch = function (groupName) {
        $rootScope.groupName = groupName;
        $rootScope.$emit('change:channel', $rootScope.groupName);
    };

});