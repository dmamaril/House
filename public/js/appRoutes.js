angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', 'AccountService', function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/account', {
			templateUrl: 'views/account.html',
			controller: 'AccountController',
			resolve: {
				accountInfo: function (AccountService) {
					return AccountService.get('/api/user')
						.then(function (user) {
							return user.data;
						});
				},
				groupMembers: function (AccountService) {
					return AccountService.get('/api/group')
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
				properties: function (ListService) {
					return ListService.get('/api/properties')
						.then(function (property) {
							return property;
						});
				}
			}
		})

	$locationProvider.html5Mode(true);

}]);