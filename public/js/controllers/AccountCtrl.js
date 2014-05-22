angular.module('AccountCtrl', ['AccountService']).controller('AccountController', function($scope, Account, accountInfo, groupMembers) {
  $scope.user = accountInfo;
  $scope.groupMembers = groupMembers;

  $scope.saveAccount = function () {
    Account.post($scope.user, function (user) {
      console.log('Successfully saved user info.');
    });
  };  

	$scope.tagline = 'Nothing beats a pocket protector!';

  // acct view controller

});


