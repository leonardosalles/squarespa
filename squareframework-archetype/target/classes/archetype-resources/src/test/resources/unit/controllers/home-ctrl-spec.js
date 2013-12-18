require.config({baseUrl: 'src/js'});

define(['angular-mocks', 'app'], function() {

	describe('HomeCtrlSpec', function () {
		
		beforeEach(module('app'));	 
		beforeEach(inject(function($timeout, $httpBackend, $bootstrap, $config, $controller, $rootScope) {
			httpBackend = $httpBackend;
			config = $config;
			bootstrap = $bootstrap;
			timeout = $timeout;
			controller = $controller;
			rootScope = $rootScope;
		}));
		
		describe('HomeCtrl', function () {
	                        				
			it('deve mostrar uma lista de plugins', function () {
				var scope = rootScope.$new();
				controller("HomeCtrl", {$scope: scope });
				expect(angular.isArray(scope.plugins)).toBe(true);
	        });
	
	    });
		
	    
	});
	
});