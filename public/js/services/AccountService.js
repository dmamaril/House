angular.module('houseApp')
.factory('Account', function ($http) {
  return {
    get: function () {
      return $http.get('/api/user')
        .success(function (user) {
          return user.data;
        })
        .error(function () {
          console.log('Err @ .get AccountService.js');
        })
    },
    post: function (data, callback) {
      return $http.post('/api/user', data)
        .success(callback);
    },
    getMembers: function () {
      return $http.get('/api/group')
        .success(function (groupMembers) {
          console.log(groupMembers, 'Group members');
          return groupMembers.data;
        });
    }
  };
})
