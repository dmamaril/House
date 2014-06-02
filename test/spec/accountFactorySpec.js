describe('Factory: Account', function() {
  var factory;

  beforeEach(module('houseApp'));
  beforeEach(inject(function($injector){
   factory = $injector.get('Account');
  }));

  it('should have get, post, and getMembers methods', function () { 
    expect(angular.isFunction(factory.get)).toBe(true);
    expect(angular.isFunction(factory.post)).toBe(true);
    expect(angular.isFunction(factory.getMembers)).toBe(true);
  });
  
});
