describe('Controller: ListController', function() {
  beforeEach(module('houseApp'));

  var ctrl, scope, injector, httpBackend;
  beforeEach(inject(function($controller, $rootScope, $injector, $httpBackend, $window) {
    scope = $rootScope.$new();
    httpBackend =  $httpBackend;
    ctrl = $controller('ListController', {
      $scope: scope,
      List: $injector.get('List'),
      properties: 'properties',
      $window: window
    });
  }));

  it('should have access to the scope', 
    function() {
      expect(scope.tagline).toEqual('Nothing beats a pocket protector!');
  });

  it('properties should be populated when initialized', 
    function() {
      httpBackend.when('GET', '/api/property').respond([{},{},{}]);
      httpBackend.flush();
      expect(scope.listings.length).toEqual(3);
  });

  it('should log a user out when logout is called', 
    function() {
      window.sessionStorage.token = 'test';
      window.sessionStorage.id = 1111;
      window.sessionStorage.name = 'somename';
      scope.logout();
      expect(window.sessionStorage.token).toBeUndefined();
      expect(window.sessionStorage.id).toBeUndefined();
      expect(window.sessionStorage.name).toBeUndefined();
  });
});