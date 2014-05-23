angular.module('appRoutes', ['AccountService', 'ListService']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

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
						.then(function (user) {
							return user.data;
						});
				},
				groupMembers: function (Account) {
					return Account.get('/api/group')
						.then(function (members) {
							// could this be members.data??
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
							return property;
						});
				}
			}
		});

	$locationProvider.html5Mode(true);

}]);
