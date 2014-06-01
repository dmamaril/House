describe('Factory: List', function() {
  var factory;

  beforeEach(module('houseApp'));
  beforeEach(inject(function($injector){
   factory = $injector.get('List');
  }));

  it('should have get, post, createNewGroup, fetchListing, and addListingToUserProperties methods', function () { 
    expect(angular.isFunction(factory.get)).toBe(true);
    expect(angular.isFunction(factory.post)).toBe(true);
    expect(angular.isFunction(factory.createNewGroup)).toBe(true);
    expect(angular.isFunction(factory.fetchListing)).toBe(true);
    expect(angular.isFunction(factory.addListingToUserProperties)).toBe(true);
  });
  
});
