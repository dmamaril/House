app.controller('ListingsController', function ($scope, $rootScope, Listings) {
    $scope.listings = [];

    $rootScope.$on('change:listings', function(event, listings) {
        $scope.listings = listings;
    });
    Listings.get($rootScope.groupName);

    // $scope.test = function(input) {
    //     Maps.geocode(input);
    // };
});