app.controller('AccountController', function ($scope, $rootScope, User) {
    $scope.user = User.get();
    $rootScope.$on('change:user', function(event) {
        $scope.user = User.get();
    });

    $scope.save = function (keyEvent) {
        if (keyEvent.which === 13) {
            User.set($scope.user);
        }
    };
});
