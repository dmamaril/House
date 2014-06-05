app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	$routeProvider.when('/', {
		templateUrl: 'views/home.html',
		controller: 'HomeController'
	})

	.when('/groups', {
		templateUrl: 'views/groups.html',
		controller: 'GroupsController'
	})

	.when('/listings', {
		templateUrl: 'views/listings.html',
		controller: 'ListingsController',
		resolve: {
			userData: function (User) { return User.fetch(); }
		}
	});

	$locationProvider.html5Mode(true);
}]);