app.controller('ListingsController', function ($scope, Listings) {
    $scope.listings = [];

    $rootScope.$on('change:listings', function(event, listings) {
        $scope.listings = listings;
    });
    Listings.get($rootScope.groupName);
});