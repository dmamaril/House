app.controller('ListController', function ($scope, List, properties, $window) {
  $scope.properties = properties;

  $scope.tagline = 'Nothing beats a pocket protector!';
  
  $scope.map = {
      center: {
          latitude: 45,
          longitude: -73
      },
      zoom: 13
  };

  $scope.toggleGroupForm = function () {
    $scope.creatingGroup = !$scope.creatingGroup;
  };

  $scope.createGroup = function () {
    List.createNewGroup({ groupName: $scope.groupName }, function () {
      console.log($scope.groupName, 'has been created');
    });
  };

  $scope.fetchListing = function () {
    List.fetchListing({ listingUrl: $scope.listingUrl }, function (expectListingData) {
      console.log(expectListingData, 'Received');
    });
  }

  $scope.logout = function () {
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.id;
    delete $window.sessionStorage.name;
  };

});


