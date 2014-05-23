// angular.module('ListService', []).factory('List', function($http) {

app.factory('List', function ($http) {  
  return {
    get: function () {
      $http.get('/api/property')
        .success(function (properties) {
          console.log('List Service returned properties', properties);
          return properties.data;
        });
    },
    post: function(data, callback) {
      $http.post('/api/property')
        .success(callback);
    }
  };
})
// });
