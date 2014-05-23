// angular.module('AccountCtrl', ['AccountService']).controller('AccountController', function($scope, Account, accountInfo, groupMembers) {
app.controller('AccountController', function ($scope, Account, accountInfo, groupMembers, $window) {
  $scope.user = accountInfo;
  $scope.groupMembers = groupMembers;
  $scope.showInput = false;
  $scope.tagline = 'Nothing beats a pocket protector!';

  $scope.toggleInput = function () {
    $scope.showInput = !$scope.showInput;
  }

  $scope.saveAccount = function () {
    Account.post($scope.user, function (user) {
      console.log('Successfully saved user info.');
    });
    $scope.showInput = !$scope.showInput;
  };  

  $scope.logout = function () {
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.id;
    delete $window.sessionStorage.name;
  };
})

// });


