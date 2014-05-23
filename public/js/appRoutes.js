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
					return Account.get('/api/user')
						.then (function (user) {
							console.log('User', user)
							return user.data;
						});
				},
				groupMembers: function (Account) {
					return Account.get('/api/group')
						.then(function (members) {
							console.log('Members', members)
							return members;
						});
				}
			}
		})

		.when('/list', {
			templateUrl: 'views/list.html',
			controller: 'ListController',
			resolve: {
				properties: function (List) {
					return List.get('/api/property')
						.then(function (property) {
							console.log('Property', property);
							return property;
						});
				}
			}
		});

	$locationProvider.html5Mode(true);
	
}])

// }]);
