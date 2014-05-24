app.controller('ListController', function ($scope, List, properties, $window) {
  $scope.listings = properties;
  $scope.user = $window.sessionStorage.userData;

  $scope.tagline = 'Nothing beats a pocket protector!';

  $scope.toggleGroupForm = function () {
    $scope.creatingGroup = !$scope.creatingGroup;
  };

  $scope.createGroup = function () {
    List.createNewGroup({ groupName: $scope.groupName }, function () {
      console.log($scope.groupName, 'has been created');
    });
  };

  $scope.fetchListing = function () {
    List.fetchListing({ listingUrl: $scope.listingUrl }, function (listingData) {
      $scope.listingData = listingData;
      console.log(listingData);
      List.addListingToUserProperties(listingData, function (userProperties) {
        console.log(userProperties, ' has been saved to user.');
      });
    });
  };
  
  $scope.logout = function () {
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.id;
    delete $window.sessionStorage.name;
  };
});


