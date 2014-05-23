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


  $scope.listingUrl = 'https://sfbay.craigslist.org/sfc/apa/4481288320.html'
  $scope.fetchListing = function () {
    List.fetchListing({ listingUrl: $scope.listingUrl }, function (expectListingData) {
      console.log('Now @ ListCtrl');
    });
  }
  
  $scope.logout = function () {
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.id;
    delete $window.sessionStorage.name;
  };



});


