app.controller('HeaderController', function ($scope, $location, Listings) {
    $scope.navigate = function (path) {
        $location.path('/' + path);
    };

    $scope.post = function (groupName, listing) {
        var listing = {
            votes: [],
            title: '',
            url: '',
            location: [], // long, lat
            rooms: '',
            price: 800
        };
        Listings.post(listing);
    };

    $scope.logout = function (groupName) {
        console.log("You have been logged out!");
    };
});

