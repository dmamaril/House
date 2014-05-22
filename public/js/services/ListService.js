angular.module('ListService', []).factory('List', ['$http', function($http) {
  return {
    get: function () {
      $http.get('/api/properties')
        .success(function (properties) {
          console.log('List Service returned properties', properties);
          return properties.data;
        });
    }
  }
}]);