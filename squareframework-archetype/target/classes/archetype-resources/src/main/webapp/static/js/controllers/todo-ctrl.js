define(['controllers/controllers',
        'text!views/todo.html',
        'text!views/todo-editar.html',
        'text!views/todo-deletar.html'],
        
     function (controllers, template, templateEditar, templateDeletar) {
	
	'use strict';
	
	controllers.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/todo', {template: template, controller: 'TodoCtrl'});
	}]);
	
	controllers.controller('TodoCtrl', function ($scope, $window, $pager, $notify, $dialog, Todo) {
		$window.document.title = I18n.t('menu.todo');
		 
		$scope.filtro = {};

		$scope.pager = $pager.$resource(Todo);
		$scope.pager.apply($scope.filtro);
			
		$scope.pesquisar = function () {
			$scope.pager.execute($scope.filtro);
		};
		
		$scope.openModalEditar = function (todo) {
			var resolverTodo = function () {
				return angular.copy(todo || new Todo());
			};
			
			var dialog = $dialog.dialog({template: templateEditar, controller: 'TodoEditarCtrl', resolve: {todo: resolverTodo}});
			dialog.open().then(function () {
				$notify.success(I18n.t('defaults.alteracaoSucesso'));
				$scope.pager.reload();
			});
		};
		
		$scope.openModalDeletar = function (todo) {
			var resolverTodo = function () {
				return angular.copy(todo || new Todo());
			};
			
			var dialog = $dialog.dialog({template: templateDeletar, controller: 'TodoDeletarCtrl', resolve: {todo: resolverTodo}});
			dialog.open().then(function () {
				$notify.success(I18n.t('defaults.exclusaoSucesso'));
				$scope.pager.reload();
			});
		};
	});
	
	controllers.controller('TodoEditarCtrl', function ($scope, $error, todo) {
		$scope.todo = todo;
		
		$scope.salvar = function () {
			if ($scope.form.isInvalid()) { return; }
			
			$scope.todo.$save(function (response) {
				$scope.resolve(response);
			}, $error.notify());
		};
		
	});
	
	controllers.controller('TodoDeletarCtrl', function ($scope, $error, todo) {
		$scope.todo = todo;
		
		$scope.deletar = function () {
			$scope.todo.$delete(function (response) {
				$scope.resolve(response);
			}, $error.notify());
		};
		
	});
	
});