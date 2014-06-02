app.controller('PropertiesController', function ($scope, Listings) {

    $scope.isUpvoted = function(listing) {
        return listing.votes.some(function(userID) {
            return user === $rootScope.user._id;
        });
    };

    $scope.toggleVote = function (listing) {
        if (isUpvoted(listing)) {
            listing.votes.forEach(function (user, i) {
                if (user === $rootScope.user._id) {
                    listing.votes.splice(i, 1);
                }
            });
        } else {
            listing.votes.push($rootScope.user._id);
        }

        Listings.put(listing);
    };

    $scope.remove = function (listing) {
        Listings.delete(listing);
    };

    console.log($scope.listings);
});
