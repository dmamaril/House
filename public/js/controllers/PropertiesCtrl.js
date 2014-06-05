app.controller('PropertiesController', function ($scope, $rootScope, Listings) {
    $scope.properties = $scope.listings;
    $rootScope.$on('change:listings', function(event, listings) {
        $scope.properties = listings;
    });

    $scope.remove = function (listing) {
        console.log("Removing: " + listing.url);
        Listings.remove(listing);
    };

});
