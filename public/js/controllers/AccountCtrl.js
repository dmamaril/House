app.controller('AccountController', function ($scope, $rootScope, User) {
    $scope.user = User.attr();
    $rootScope.$on('change:user', function(event) {
        $scope.user = User.attr();
    });

    $scope.save = function (keyEvent) {
        if (keyEvent.which === 13) {
            console.log("Saving new info...", $scope.user);
            User.set($scope.user);
        }
    };
});
