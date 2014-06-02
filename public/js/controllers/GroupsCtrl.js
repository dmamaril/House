app.controller('GroupsController', function ($scope, $rootScope, Groups) {
    $scope.members = [];

    $rootScope.$on('change:group', function(event, members) {
        $scope.members = members;
    });
    Groups.get();
});