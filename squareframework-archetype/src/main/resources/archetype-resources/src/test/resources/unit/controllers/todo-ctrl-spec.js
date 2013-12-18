require.config({baseUrl: 'src/js'});

define(['angular-mocks', 'app'], function() {

	describe('TodoCtrlSpec', function () {
		
		beforeEach(module('app'));	 
		beforeEach(inject(function($timeout, $httpBackend, $bootstrap, $config, $controller, $rootScope, Todo) {
			httpBackend = $httpBackend;
			config = $config;
			bootstrap = $bootstrap;
			timeout = $timeout;
			controller = $controller;
			rootScope = $rootScope;
			resourceTodo = Todo;
		}));
		
		describe('TodoCtrl', function () {
	                        				
			it('deve listar 3 todos', function () {
				var scope = rootScope.$new();
				controller("TodoCtrl", {$scope: scope });
				
				httpBackend.expectGET(config.restfulUriPrefix + 'todo?limit=10&page=1').respond(200, 
						[{"id": 1, "titulo": "Acordar Cedo", concluido: true},
						 {"id": 2, "titulo": "Dormir Tarde", concluido: false},
						 {"id": 3, "titulo": "Levar cachorro para passear", concluido: false}]);
				
				httpBackend.flush();
	            expect(scope.pager.results.length).toBe(3);
	        });
	
	    });
			
		    
	    describe('TodoEditarCtrl', function () {
	       	 
	 
	        it('deve adicionar um novo todo', function () {
	        	var scope = rootScope.$new();
				controller("TodoEditarCtrl", {$scope: scope, todo: new resourceTodo()});
									
				scope.todo.titulo = 'Novo Todo';
				
				scope.form = { isInvalid: function (){
					return false;
				}};
				
				scope.resolve = function (){};
				
				scope.salvar();					
				
				httpBackend.expectPOST(config.restfulUriPrefix + 'todo').respond(200, angular.extend({id: 1903}, scope.todo));
				httpBackend.flush();
				
				expect(scope.todo.id).toBe(1903);
	        });
	        
	        it('deve alterar um todo existente', function () {
	        	var scope = rootScope.$new();
				controller("TodoEditarCtrl", {$scope: scope, todo: new resourceTodo()});
								
				scope.todo.id = 1;
				scope.todo.titulo = 'Novo Todo';
				scope.todo.concluido = true;
				
				scope.form = { isInvalid: function (){
					return false;
				}};
				
				scope.resolve = function (){};
				
				scope.salvar();					
				
				httpBackend.expectPOST(config.restfulUriPrefix + 'todo/' + scope.todo.id).respond(200, null);
				httpBackend.flush();
				
				expect(scope.todo.titulo).toBe('Novo Todo');
	        });
	    
	    });
		    
		   
		    
	    describe('VeiculoDeletarCtrl', function () {
	    	
	    	it('deve deletar um todo existente', function () {
	        	var scope = rootScope.$new();
				controller("TodoDeletarCtrl", {$scope: scope, todo: new resourceTodo()});
								
				scope.todo.id = 2;
				
				scope.resolve = function (){};
				
				scope.deletar();					
				
				httpBackend.expectDELETE(config.restfulUriPrefix + 'todo/' + scope.todo.id).respond(204, null);
				httpBackend.flush();
				
	        });
	    	
	    });
	    
	});
	
});