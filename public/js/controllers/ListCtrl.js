// angular.module('ListCtrl', ['ListService']).controller('ListController', function($scope, List, properties) {

app.controller('ListController', function ($scope, List, properties) {
  $scope.properties = properties;

  $scope.tagline = 'Nothing beats a pocket protector!';
  
  $scope.logout = function () {
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.id;
    delete $window.sessionStorage.name;
  };
});




// });


