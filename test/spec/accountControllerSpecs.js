describe('Controller: AccountController', function() {
  beforeEach(module('houseApp'));

  var ctrl, scope, injector, httpBackend;
  beforeEach(inject(function($controller, $rootScope, $injector, $window) {
    scope = $rootScope.$new();
    ctrl = $controller('AccountController', {
      $scope: scope,
      Account: $injector.get('Account'),
      accountInfo: 'accountInfo',
      groupMembers: 'groupMembers',
      $window: window
    });
  }));

  it('should have access to the scope', 
    function() {
      expect(scope.tagline).toEqual('Nothing beats a pocket protector!');
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