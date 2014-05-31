describe('notesFactory tests', function() {
  var factory;

  beforeEach(module('houseApp'));
  beforeEach(inject(function($injector){
   factory = $injector.get('List');
  }));

  it('should have a get function', function () { 
    expect(angular.isFunction(factory.get)).toBe(true);
  });
  
  it('should have a post function', function () { 
    expect(angular.isFunction(factory.post)).toBe(true);
  });

});