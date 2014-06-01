angular.module('houseApp')
.controller('ListController', function ($scope, List, properties, $window) {
  $scope.properties = properties.properties;
  $scope.groupLocation = properties.groupLocation;
  $scope.user = $window.sessionStorage.userData;
  $scope.listings;
  $scope.tagline = 'Nothing beats a pocket protector!';
  
  $scope.toggleGroupForm = function () {
    $scope.creatingGroup = !$scope.creatingGroup;
  };

  $scope.createGroup = function () {
    List.createNewGroup({ groupName: $scope.groupName, groupLocation: $scope.groupLocation }, function () {
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

  $scope.fetchGroupListings = function () {
    List.get()
      .success(function (groupListings) {
        $scope.listings = groupListings;
      })
  };

  $scope.fetchGroupListings();

});
