app.controller('ListController', function ($scope, List, properties, $window) {
  $scope.properties = properties;

  $scope.tagline = 'Nothing beats a pocket protector!';

  $scope.toggleGroupForm = function () {
    $scope.creatingGroup = !$scope.creatingGroup;
  };

  $scope.createGroup = function () {
    List.createNewGroup({ groupName: $scope.groupName }, function () {
      console.log($scope.groupName, 'has been created');
    });
  };

  $scope.listingUrl = 'https://www.airbnb.com/rooms/784034'
  $scope.fetchListing = function () {
    List.fetchListing({ listingUrl: $scope.listingUrl }, function (listingData) {
      // { coordinates: coordinates, neighborhood: neighborhood, bedrooms: bedrooms, monthlyPrice: monthlyPrice }
      $scope.listingData = listingData;
    });
  }
  
  $scope.logout = function () {
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.id;
    delete $window.sessionStorage.name;
  };



});


