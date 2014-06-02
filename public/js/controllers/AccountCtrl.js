app.controller('AccountController', function ($scope, User) {
    $scope.user = $rootScope.user;

    $rootScope.on('change:user', function(event, user) {
        $scope.user = $rootScope.user;
    });
    User.get();

    $scope.save = function (key) {
        if (keyEvent.which === 13) {
            $rootScope.user = $scope.user;
            User.edit($rootScope.user);
        }
    };
});