angular.module('ListCtrl', ['ListService']).controller('ListController', function($scope, List, properties) {
  $scope.properties = properties;

  $scope.tagline = 'Nothing beats a pocket protector!';
});


