define(['angular-mocks', 'js/app'], function(){
	
	describe('filter-pad', function() {
	  var lpadFilter, rpadFilter, lrpadFilter;
	
	  beforeEach(module('square.filters'));
	  beforeEach(inject(function($filter) {
		  lpadFilter = $filter('lpad');
		  rpadFilter = $filter('rpad');
		  lrpadFilter = $filter('lrpad');
	  }));
	
	  it('lpad', function() {
		  expect(lpadFilter('1', 8)).toEqual('00000001');
		  expect(lpadFilter(1, 8)).toEqual('00000001');
		  expect(lpadFilter('1', 8, ' ')).toEqual('       1');
		  
		  expect(lpadFilter('1111', 2)).toEqual('1111');
		  expect(lpadFilter(1111, 2)).toEqual('1111');
		  expect(lpadFilter('1111', 2, ' ')).toEqual('1111');
		  		  
		  expect(lpadFilter('foo', 8)).toEqual('00000foo');
		  expect(lpadFilter('foo', 7)).toEqual('0000foo');		  
		  expect(lpadFilter('foo', 8, '0')).toEqual('00000foo');
		  expect(lpadFilter('foo', 7, '0')).toEqual('0000foo');
		  expect(lpadFilter('foo', 8, ' ')).toEqual('     foo');
		  expect(lpadFilter('foo', 7, ' ')).toEqual('    foo');		  
		    
		  expect(lpadFilter('', 2)).toEqual('00');
		  expect(lpadFilter('', 2, ' ')).toEqual('  ');
		  
		  expect(lpadFilter(null, 2)).toEqual('00');
		  expect(lpadFilter(null, 2, ' ')).toEqual('  ');
		  
		  expect(lpadFilter(undefined, 2)).toEqual('00');
		  expect(lpadFilter(undefined, 2, ' ')).toEqual('  ');		  
	  });
	  
	  it('rpad', function() {
		  expect(rpadFilter('1', 8)).toEqual('10000000');
		  expect(rpadFilter(1, 8)).toEqual('10000000');
		  expect(rpadFilter('1', 8, ' ')).toEqual('1       ');
		  
		  expect(rpadFilter('1111', 2)).toEqual('1111');
		  expect(rpadFilter(1111, 2)).toEqual('1111');
		  expect(rpadFilter('1111', 2, ' ')).toEqual('1111');
		  
		  expect(rpadFilter('foo', 8)).toEqual('foo00000');
		  expect(rpadFilter('foo', 7)).toEqual('foo0000');		  
		  expect(rpadFilter('foo', 8, '0')).toEqual('foo00000');
		  expect(rpadFilter('foo', 7, '0')).toEqual('foo0000');
		  expect(rpadFilter('foo', 8, ' ')).toEqual('foo     ');
		  expect(rpadFilter('foo', 7, ' ')).toEqual('foo    ');
		  
		  expect(rpadFilter('', 2)).toEqual('00');
		  expect(rpadFilter('', 2, ' ')).toEqual('  ');
		  
		  expect(rpadFilter(null, 2)).toEqual('00');
		  expect(rpadFilter(null, 2, ' ')).toEqual('  ');
		  
		  expect(rpadFilter(undefined, 2)).toEqual('00');
		  expect(rpadFilter(undefined, 2, ' ')).toEqual('  ');		  
	  });
	  
	  it('lrpad', function() {		  
		  expect(lrpadFilter('1', 8)).toEqual('00001000');
		  expect(lrpadFilter(1, 8)).toEqual('00001000');		  
		  expect(lrpadFilter('1', 8, ' ')).toEqual('    1   ');		    
		  
		  expect(lrpadFilter('foo', 8)).toEqual('000foo00');
		  expect(lrpadFilter('foo', 7)).toEqual('00foo00');		  
		  
		  expect(lrpadFilter('foo', 7, '!@$%dofjrofj')).toEqual('!!foo!!');		    
		  
		  expect(lrpadFilter('', 2)).toEqual('00');
		  expect(lrpadFilter('', 2, ' ')).toEqual('  ');		  
		  expect(lrpadFilter(null, 2)).toEqual('00');
		  expect(lrpadFilter(null, 2, ' ')).toEqual('  ');		  
		  expect(lrpadFilter(undefined, 2)).toEqual('00');
		  expect(lrpadFilter(undefined, 2, ' ')).toEqual('  ');		    
	  });
	  
	  	  	  	  
	});
	
	
	
	
});