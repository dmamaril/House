app.controller('PropertiesController', function ($scope, $rootScope, Listings, User) {
    $scope.properties = $scope.listings;
    $rootScope.$on('change:listings', function(event, listings) {
        $scope.properties = listings;
    });

    $scope.remove = function (listing) {
        Listings.remove(User.currentGroup(), listing._id);
    };

});
