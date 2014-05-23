// angular.module('AuthInterceptor', []).factory('authInterceptor', function ($q, $window, $location) {

app.factory('authInterceptor', function ($q, $window, $location) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) { config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token; }
      return config;
    },
    response: function (response) {
      if (response.status === 401) { $location.path('/login'); }
      return response || $q.when(response);
    },
    login: function () { $location.path('/login'); }
  };
})


// });     
