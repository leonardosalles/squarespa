require.config({baseUrl: 'src/js'});

define(['angular-mocks', 'app'], function() {

	describe('App', function() {

		beforeEach(module('app'));
		beforeEach(inject(function($timeout, $httpBackend, $bootstrap, $config) {
			httpBackend = $httpBackend;
			bootstrap = $bootstrap;
			timeout = $timeout;
		}));
		
		
		it('run', function() {	
			timeout.flush();
			
			waitsFor(function() {					
				return bootstrap.isReady();
		    }, "aplicação não inicializou", 10000);
		});
		
	});	
	
});