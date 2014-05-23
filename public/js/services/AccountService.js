angular.module('AccountService', []).factory('Account', ['$http', function($http) {
  return {
    get: function () {
      $http.get('/api/user')
        .success(function (user) {
          console.log('Account Service returned user', user);
          return user.data;
        });
    },
    post: function (data, callback) {
      $http.post('/api/user', data)
        .success(callback);
    }
  };
}]);
