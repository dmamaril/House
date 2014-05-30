// angular.module('appRoutes', ['AccountService', 'ListService']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider

		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/account', {
			templateUrl: 'views/account.html',
			controller: 'AccountController',
			resolve: {
				accountInfo: function (Account) {
					return Account.get()
						.then (function (user) {
							return user.data;
						});
				},
				groupMembers: function (Account) {
					return Account.getMembers()
						.then(function (members) {
							console.log('Members fetch success:', members.data);
							return members.data;
						});
				}
			}
		})

		.when('/list', {
			templateUrl: 'views/list.html',
			controller: 'ListController',
			resolve: {
				properties: function (List) {
					return List.get()
						.then(function (property) {
							return property.data;
						});
				}
			}
		});

	$locationProvider.html5Mode(true);
	
}])

// }]);
