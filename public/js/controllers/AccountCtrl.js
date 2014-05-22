angular.module('AccountCtrl', ['AccountService']).controller('AccountController', function($scope, Account, accountInfo, groupMembers) {
  $scope.user = accountInfo;
  $scope.group = groupMembers;

  

	$scope.tagline = 'Nothing beats a pocket protector!';

  // acct view controller

});


