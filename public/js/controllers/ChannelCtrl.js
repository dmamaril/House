app.controller('ChannelController', function ($scope, Groups) {
    $scope.groupName = $rootScope.groupName;

    $scope.remove = function (groupName) {
        Groups.delete(groupName);
    };

    $scope.join = function (groupName) {
        Groups.post(groupName);
    };

    $scope.switch = function (groupName) {
        $rootScope.groupName = groupName;
        $rootScope.$emit('channelchange', $rootScope.groupName);
    };

    $rootScope.$on('channelchange', function(event, data) {
        $scope.groupName = data;
    });
});