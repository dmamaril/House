app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider

		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/groups', {
			templateUrl: 'views/groups.html',
			controller: 'GroupsController',
			resolve: {
				groupCache: function (Groups) {
					return Groups.get()
						.then(function (members) {
							console.log(members);
							return members;
						});
				}
			}
		})

		.when('/listings', {
			templateUrl: 'views/listings.html',
			controller: 'ListingsController',
			resolve: {
				listingsCache: function (Listings) {
					return Listings.get()
						.then(function (listings) {
							return listings;
						});
				}
			}
		});

	$locationProvider.html5Mode(true);
}]);
