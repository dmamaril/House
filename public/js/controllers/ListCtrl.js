angular.module('LinkCtrl', ['LinkService']).controller('LinkController', function($scope, Link, properties) {
  $scope.properties = properties;

  $scope.tagline = 'Nothing beats a pocket protector!';
});


