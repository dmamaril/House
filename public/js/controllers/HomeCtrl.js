app.controller('HomeController', function ($scope, User) {
    $scope.userEmail = '';

    $scope.login = function(keyEvent) {
        if (keyEvent.which === 13) {
            User.login($scope.userEmail);
        }
    };
});