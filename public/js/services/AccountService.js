// angular.module('AccountService', []).factory('Account', ['$http', function($http) {
app.factory('Account', function ($http) {
  return {
    get: function () {
      return $http.get('/api/user')
        .success(function (user) {
          console.log('Account Service returned user', user);
          return user.data;
        })
        .error(function () {
          console.log('Err @ .get AccountService.js');
        })
    },
    post: function (data, callback) {
      return $http.post('/api/user', data)
        .success(callback);
    }
  };
})
// }]);
