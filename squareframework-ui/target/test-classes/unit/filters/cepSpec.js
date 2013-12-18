define(['angular-mocks', 'js/app'], function(){
	
	describe('filter-cep', function() {
	  var cepFilter;
	
	  beforeEach(module('square.filters'));
	  beforeEach(inject(function($filter) {
		  cepFilter = $filter('cep');
	  }));
	
	  it('cep string', function() {
		  expect(cepFilter('1')).toEqual('1');
		  expect(cepFilter('123')).toEqual('123');
		  expect(cepFilter('12345')).toEqual('12345');
		  expect(cepFilter('123456')).toEqual('12345-6');
		  expect(cepFilter('1234567')).toEqual('12345-67');		  
		  expect(cepFilter('12345678')).toEqual('12345-678');
		  expect(cepFilter('123456789')).toEqual('12345-678');
	  });
	  
	  it('cep number', function() {
		  expect(cepFilter(1)).toEqual('00000-001');
		  expect(cepFilter(123)).toEqual('00000-123');
		  expect(cepFilter(12345)).toEqual('00012-345');
		  expect(cepFilter(123456)).toEqual('00123-456');
		  expect(cepFilter(1234567)).toEqual('01234-567');	
		  expect(cepFilter(12345678)).toEqual('12345-678');
		  expect(cepFilter(123456789)).toEqual('12345-678');
	  });
	  
	});	

});