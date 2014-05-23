angular.module('HomeCtrl', []).controller('HomeController', function($scope, $http, $window) {

  $scope.tagline = 'KillBnB';

  $scope.logInUser = function () {
    $http.post('/login', { email: $scope.email, password: $scope.password })
      .success(function (token, status, headres, config) {
        console.log(token);
        $window.sessionStorage.token = token.token;
        $window.sessionStorage.id = token._id;
        $window.sessionStorage.name = token.name;
      });
  };

  $scope.registerUser = function () {
    $http.post('/register', { email: $scope.email, password: $scope.password, name: $scope.name});
  };

});
