// angular.module('MainCtrl', []).controller('MainController', function($scope) {

app.controller('MainController', function ($scope, $window) {
	$scope.tagline = 'To the moon and back!';	

  $scope.logout = function () {
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.id;
    delete $window.sessionStorage.name;
  }

});

// });