app.controller('HeaderController', function ($scope, $location, Listings) {
    $scope.navigate = function (path) {
        $location.path('/' + path);
    };

    $scope.post = function (groupName) {
        Listings.post();
    };

    $scope.logout = function (groupName) {
        console.log("You have been logged out!");
    };
});

