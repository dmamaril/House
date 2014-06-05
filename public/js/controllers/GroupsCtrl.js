app.controller('GroupsController', function ($scope, $rootScope, Groups, User) {
    $scope.members = [];

    $rootScope.$on('change:members', function(event, members) {
        $scope.members = members;
    });

    Groups.getMembers(User.currentGroup());
});