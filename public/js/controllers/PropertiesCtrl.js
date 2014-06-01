app.controller('PropertiesController', function ($scope, Listings) {

    $scope.grabById = function(listingID) {
        return $scope.listings.filter(function(listing) {
            return listing._id === listingID;
        })[0];
    };

    $scope.isUpvoted = function(listingID) {
        var checked = grabById(listingID);
        return checked.votes.some(function(userID) {
            return user === $rootScope.user._id;
        });
    };

    $scope.toggleVote = function (listingID) {
        var toggled = grabById(listingID);
        var isUpvoted = checkVote(listingID);
        if (isUpvoted) {
            toggled.votes.forEach(function (user, i) {
                if (user === $rootScope.user._id) {
                    toggled.votes.splice(i, 1);
                }
            });
        } else {
            toggled.votes.push($rootScope.user._id);
        }

        Listings.put(toggled);
    };

    $scope.remove = function (listingID) {
        var removed = grabById(listingID);
        Listings.delete(removed);
    };
});
