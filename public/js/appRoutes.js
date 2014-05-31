angular.module('houseApp')
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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
						.then (function (user, $window) {
							return user.data;
						});
				},
				groupMembers: function (Account) {
					return Account.getMembers()
						.then(function (members) {
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
					return List.get('/api/property')
						.then(function (property) {
							console.log('Property', property);
							return property.data;
						});
				}
			}
		});

	$locationProvider.html5Mode(true);
	
}])