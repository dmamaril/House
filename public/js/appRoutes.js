app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		
		$routeProvider.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/groups', {
			templateUrl: 'views/groups.html',
			controller: 'GroupsController',
			resolve: {
				userData: function (User) {
					return User.get()
						.then(function (data) {
							console.log('data resolved ', data);
							return data;
						});
				}
			}
		})

		.when('/listings', {
			templateUrl: 'views/listings.html',
			controller: 'ListingsController'
		});

	$locationProvider.html5Mode(true);
}]);