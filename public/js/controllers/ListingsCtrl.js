app.controller('ListingsController', function ($scope, $rootScope, $routeParams, Listings, User) {
    // if (!User.isInitialized()) { User.init($routeParams.id); }
    $scope.listings = [];
    
    $rootScope.$on('change:listings', function(event, listings) {
        $scope.listings = listings;
    });

    // $rootScope.on('change:currentGroup', function (event, currentGroup) {

    // });

    Listings.getByGroup(User.currentGroup());
});