define([
	'translates/locale_pt-br',
	'translates/locale_en',
	
	'square/app',
    
	'services/services',
	'services/resources',
	
	
	'controllers/controllers',
	'controllers/home-ctrl',
	'controllers/todo-ctrl'
    
], function (localePtBR, localeEn) {
	
	'use strict';
	
	var app = angular.module('app', ['square', '$strap.directives', 'app.services', 'app.controllers']);

	app.config(function ($translateProvider) {
		$translateProvider.translations('pt-BR', localePtBR);
		$translateProvider.translations('en', localeEn);
	});
	
	
	app.run(function ($window, $security, $bootstrap, $q, $error, $rootScope, $timeout, $translate) {
		$translate.use('pt-BR');
		
		$rootScope.$on('squareReady', function () {
			$window.document.title = I18n.t('titulo');
			
			$rootScope.header = {title: I18n.t('titulo'), infos: [], links: []};
			$rootScope.subheader = {};
			
			$rootScope.menu = [];
			$rootScope.menu.push({'text': I18n.t('menu.inicio'), href: '#/', 'submenu': []});
			$rootScope.menu.push({'text': I18n.t('menu.todo'), href: '#/todo', 'submenu': []});
		});
		
		
		$bootstrap.setProgress(0);
		
		var promise1 = function () {
			var defer = $q.defer();
			$timeout(function () {
				$bootstrap.setProgress($bootstrap.getProgress() + 20);
				defer.resolve();
			}, 500);
			return defer.promise;
		};
								
		
		$q.all([promise1(), promise1(), promise1(), promise1(), promise1()]).always(function () {
			$bootstrap.ready();
		});
	});
	
	return app;
	
});