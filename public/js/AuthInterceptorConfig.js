// angular.module('authInterceptorConfig', []).config(['$httpProvider', function ($httpProvider) {

app.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}])

// }]);
