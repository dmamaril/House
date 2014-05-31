describe('Controller: ListController', function() {
  beforeEach(module('houseApp'));

  var ctrl, scope, injectors;
  beforeEach(inject(function($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    ctrl = $controller('ListController', {
      $scope: scope,
      List: $injector.get('List'),
      properties: 'properties'
    });
  }));

  it('should view the scope', 
    function() {
      expect(scope.tagline).toEqual('Nothing beats a pocket protector!');
  });

  it('should call \'fetchGroupListings\' when loaded', 
    function() {
      spyOn(scope, 'fetchGroupListings');
      scope.fetchGroupListings();
      expect(scope.fetchGroupListings).toHaveBeenCalled();
  });
});