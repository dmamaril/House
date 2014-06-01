describe('Controller: HomeController', function() {
  beforeEach(module('houseApp'));

  var ctrl, scope, injector, httpBackend, location;
  beforeEach(inject(function($controller, $rootScope, $injector, $httpBackend, $window, $location) {
    scope = $rootScope.$new();
    httpBackend =  $httpBackend;
    location = $location
    ctrl = $controller('HomeController', {
      $scope: scope,
      $window: window,
    });
  }));

  it('should have access to the scope', 
    function() {
      expect(scope.tagline).toEqual('KillBnB');
  });

  it('should store session data when a user logs in', 
    function() {
      httpBackend.when('POST', '/login').respond({token:'token', _id: 100, name: 'test'});
      scope.logInUser()
      httpBackend.flush();
      expect(window.sessionStorage.token).toEqual('token');
      expect(window.sessionStorage.id).toEqual('100');
      expect(window.sessionStorage.name).toEqual('test');
  });

  it('should redirect to /account after login', 
    function() {
      httpBackend.when('POST', '/login').respond({token:'token', _id: 100, name: 'test'});
      scope.logInUser()
      httpBackend.flush();
      expect(location.path()).toBe('/account');
  });

});
