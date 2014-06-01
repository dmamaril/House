app.controller('GroupsController', function ($scope, $window, Groups, groupCache, Account) {
  $scope.user = $rootScope.user;
  $scope.groupName = $rootScope.groupName;
  $scope.members = groupMembers;

  $scope.editUser = function (propertyName) {
    if (keyEvent.which === 13) {
      $http.post('/login', { email: $scope.userEmail })
        .success(function(user) {
          $rootScope.user = user;
          $rootScope.id = user._id;
          $rootScope.groupName = user.groups[0];
          $location.path("/listings");
        });
    }
  };

  $scope.removeGroup = function (groupName) {

  };

  $scope.joinGroup = function (groupName) {

  };

  $scope.switchGroups = function (groupName) {

  };

  $scope.logout = function () {
    console.log("You have been logged out!");
  };
});