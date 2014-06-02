app.controller('AccountController', function ($scope, $rootScope, User) {
    $scope.user = $rootScope.user;

    $rootScope.$on('change:user', function (event, user) {
        $scope.user = $rootScope.user;
    });
    User.get();

    $scope.save = function (keyEvent) {
        if (keyEvent.which === 13) {
            $rootScope.user = $scope.user;
            console.log("Saving new info...", $rootScope.user);
            User.edit($rootScope.user);
        }
    };
});