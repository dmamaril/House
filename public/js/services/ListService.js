angular.module('houseApp')
.factory('List', function ($http) {  
  return {
    get: function () {
      return $http.get('/api/property')
        .success(function (properties) {
          return properties.data;
        })
        .error(function () {
          console.log('Error @ .get listService.js');
        })
    },
    post: function(data, callback) {
      return $http.post('/api/property', data)
        .success(callback);
    },
    createNewGroup: function(data, callback) {

      return $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+data.groupLocation+'&sensor=false')
           .success(function(data){console.log(data)})
           .error(function(err){console.log(err)});

      // return $http.post('/api/group', data)
      //   .success(callback);
    } ,
    fetchListing: function(listingData, callback) {
      return $http.post('/api/fetchListing', listingData)
        .success(callback);
    },
    addListingToUserProperties: function (listingData, callback) {
      return $http.post('/api/addListingToUserProperties', listingData);
    }
  };
});
