app.controller('HomeController', function ($scope, $rootScope, $http, $location) {
  $scope.userEmail = '';

  $scope.login = function(keyEvent) {
    if (keyEvent.which === 13) {
      $http.post('/login', { email: $scope.userEmail })
        .success(function(user) {
          console.log(user);
          $rootScope.user = user;
          $rootScope.id = user._id;
          $rootScope.groupName = user.groups[0];
          $location.path("/listings");
        });
    }
  };
});