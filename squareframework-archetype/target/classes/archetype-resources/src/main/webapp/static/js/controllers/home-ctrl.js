define(['controllers/controllers', 'text!views/home.html'],	function (controllers, template) {
	'use strict';
	
	controllers.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {template: template, controller: 'HomeCtrl'});
	}]);
	
	controllers.controller('HomeCtrl', function ($scope, $window) {
		$window.document.title = I18n.t('menu.inicio');
		 
		$scope.plugins = ['AngularJS',
		                  'AngularStrap',
		                  'Bootstrap',
		                  'Font Awesome',
		                  'jQuery',
		                  'RequireJS',
		                  'Select2'];
	});
	
});