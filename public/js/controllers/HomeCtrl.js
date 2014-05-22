angular.module('HomeCtrl', []).controller('HomeController', '$http', function($scope, $http) {

  $scope.tagline = 'KillBnB';

  $scope.logInUser = function () {
    $http.post('/login', { email: $scope.email, password: $scope.password });
  };

  $scope.registerUser = function () {
    $http.post('/register', { email: $scope.email, password: $scope.password, name: $scope.name});
  };

});