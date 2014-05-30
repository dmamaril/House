angular.module('houseApp')
.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}]);