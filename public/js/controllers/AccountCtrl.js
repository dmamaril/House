app.controller('AccountController', function ($scope, User) {

  $scope.save = function (propertyName) {
    if (keyEvent.which === 13) {
      User.post();
    }
  };
});