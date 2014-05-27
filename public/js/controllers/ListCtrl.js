app.controller('ListController', function ($scope, List, properties, $window) {
  $scope.properties = properties;

  $scope.tagline = 'Nothing beats a pocket protector!';
  
  $scope.map = {
      center: {
          latitude: 45.5,
          longitude: -73.5
      },
      zoom: 13
  };

  $scope.map.markers = [
    {coords: {latitude: 45.5, longitude: -73.5}, show:false, info: {price: 1000, title: 'Whatever'}},
    {coords: {latitude: 45, longitude: -73.5}, show:false, info: {price: 1500, title: 'Whatever2'}},
    {coords: {latitude: 45.5, longitude: -73}, show:false, info: {price: 1200, title: 'Whatever3'}}
  ];


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

  console.log(div);
  };

});
