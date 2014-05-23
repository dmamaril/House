// angular.module('HomeCtrl', []).controller('HomeController', function($scope, $http, $window) {

app.controller('HomeController', function ($scope, $http, $window, $location) {
  $scope.tagline = 'KillBnB';
  $scope.showSignUp = false;

  $scope.toggleSignUp = function () {
    $scope.showSignUp = true;
  }

  $scope.logInUser = function () {
    $http.post('/login', { email: $scope.email, password: $scope.password })
      .success(function (token, status, headers , config) {
        $window.sessionStorage.token = token.token;
        $window.sessionStorage.id = token._id;
        $window.sessionStorage.name = token.name;
        $location.path('/account');
      });
  };

  $scope.registerUser = function () {
    var userData = {
      email: $scope.email, 
      password: $scope.password, 
      name: $scope.name
    };
    // need to receive session token & assign to $window.sessionStorage then redirect to /account
    $http.post('/register', userData)
      .success(function (registeredUser) {
        $http.post('/login', { email: userData.email, password: userData.password })
          .success(function (token, status, headers, config) {
            $window.sessionStorage.token = token.token;
            $window.sessionStorage.id = token._id;
            $window.sessionStorage.name = token.name;
            $location.path('/account');
          });
      });
  };
})


// });
