describe('Factory: Account', function() {
  var factory;

  beforeEach(module('houseApp'));
  beforeEach(inject(function($injector){
   factory = $injector.get('authInterceptor');
  }));

  it('should have get, post, and getMembers methods', function () { 
    expect(angular.isFunction(factory.request)).toBe(true);
    expect(angular.isFunction(factory.response)).toBe(true);
    expect(angular.isFunction(factory.login)).toBe(true);
  });
  
});
