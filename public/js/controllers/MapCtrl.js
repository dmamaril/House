angular.module('houseApp')
.controller('MapController', function ($scope) {
  $scope.map = {
      center: {
          latitude: $scope.groupLocation[0],
          longitude: $scope.groupLocation[1]
      },
      zoom: 13
  };

  $scope.map.markers = [
    {coords: {latitude: 45.5, longitude: -73.5}, show:false, info: {price: 1000, title: 'Whatever'}},
    {coords: {latitude: 45, longitude: -73.5}, show:false, info: {price: 1500, title: 'Whatever2'}},
    {coords: {latitude: 45.5, longitude: -73}, show:false, info: {price: 1200, title: 'Whatever3'}}
  ];

}