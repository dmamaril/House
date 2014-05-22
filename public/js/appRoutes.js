angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/account', {
			templateUrl: 'views/account.html',
			controller: 'AccountController'
		})

		.when('/list', {
			templateUrl: 'views/list.html',
			controller: 'ListController'	
		})



	$locationProvider.html5Mode(true);

}]);