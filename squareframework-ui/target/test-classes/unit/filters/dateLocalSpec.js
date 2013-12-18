define(['angular-mocks', 'js/app'], function(){
	
	describe('filter-datelocal', function() {
		var dateLocaFilter;
		var timezone;
		
		beforeEach(module('square'));
		beforeEach(inject(function($filter, $timezone) {
			dateLocaFilter = $filter('dateLocal');
			timezone = $timezone;
		}));	
		
		it('default', function() {
			expect(dateLocaFilter('2013-07-19T17:32:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 17:32:00');
			expect(dateLocaFilter('2013-07-19T23:59:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 23:59:00');
			expect(dateLocaFilter('2013-07-19T00:00:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 00:00:00');
			
			timezone.use('XXX');
			expect(dateLocaFilter('2013-07-19T17:32:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 17:32:00');
			expect(dateLocaFilter('2013-07-19T23:59:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 23:59:00');
			expect(dateLocaFilter('2013-07-19T00:00:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 00:00:00');
		});
	  
		
		it('America/Sao_Paulo', function() {
			timezone.use('America/Sao_Paulo');
			
			expect(dateLocaFilter('2013-07-19T17:32:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 17:32:00');
			expect(dateLocaFilter('2013-07-19T23:59:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 23:59:00');
			expect(dateLocaFilter('2013-07-19T00:00:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 00:00:00');
		});
		
		it('America/Campo_Grande', function() {
			timezone.use('America/Campo_Grande');
			
			expect(dateLocaFilter('2013-07-19T17:32:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 16:32:00');
			expect(dateLocaFilter('2013-07-19T23:59:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 22:59:00');
			expect(dateLocaFilter('2013-07-19T00:00:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('18/07/2013 23:00:00');
		});
		

		it('America/Montevideo', function() {
			timezone.use('America/Montevideo');
			
			expect(dateLocaFilter('2013-07-19T17:32:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 17:32:00');
			expect(dateLocaFilter('2013-07-19T23:59:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 23:59:00');
			expect(dateLocaFilter('2013-07-19T00:00:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 00:00:00');
		});
		
		
		it('America/Argentina/Buenos_Aires', function() {
			timezone.use('America/Argentina/Buenos_Aires');
			
			expect(dateLocaFilter('2013-07-19T17:32:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 17:32:00');
			expect(dateLocaFilter('2013-07-19T23:59:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 23:59:00');
			expect(dateLocaFilter('2013-07-19T00:00:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 00:00:00');
		});
		
		
		it('Europe/Madrid', function() {
			timezone.use('Europe/Madrid');
			
			expect(dateLocaFilter('2013-07-19T17:32:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 22:32:00');
			expect(dateLocaFilter('2013-07-19T23:59:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('20/07/2013 04:59:00');
			expect(dateLocaFilter('2013-07-19T00:00:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 05:00:00');
		});
		
		it('Australia/Sydney', function() {
			timezone.use('Australia/Sydney');
			
			expect(dateLocaFilter('2013-07-19T17:32:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('20/07/2013 06:32:00');
			expect(dateLocaFilter('2013-07-19T23:59:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('20/07/2013 12:59:00');
			expect(dateLocaFilter('2013-07-19T00:00:00', 'dd/MM/yyyy HH:mm:ss')).toEqual('19/07/2013 13:00:00');
		});

	});	
	
});