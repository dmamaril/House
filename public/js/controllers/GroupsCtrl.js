app.controller('GroupsController', function ($scope, $rootScope, Groups, User) {
    $scope.members = [];

    $rootScope.$on('change:group', function(event, members) {
        $scope.members = members;
    });
    User.test();
    Groups.get();
});