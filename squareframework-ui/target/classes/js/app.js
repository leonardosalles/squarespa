define(['text!square/views/error.html',
        'angular',
        'angular-strap',
  
        'bootstrap',
        'bootstrap-datetimepicker',
        'bootstrap-hover-dropdown',
        'bootstrap-duallistbox',
        'bootstrap-modal',
        'bootstrap-modalmanager',

        'jquery',
        'jquery-meiomask',
        'jquery-autonumeric',
        'jquery-tablesorter',
        'jquery-maxlength',
        'jquery-nicescroll',
        'jquery-scrollspy',

        'moment',
        'moment-timezone',
        'moment-timezone-data',

        'phone-number',
        'phone-number-metadata',

        'select2',
        'i18n',
        'atmosphere',

        'square/filters/filters',
        'square/filters/cep',
        'square/filters/cnpj',
        'square/filters/cpf',
        'square/filters/dateLocal',
        'square/filters/i18n',
        'square/filters/mask',
        'square/filters/pad',
        'square/filters/phone',
        'square/filters/phoneBr',
        
        'square/directives/directives',
        'square/directives/activeLink',
        'square/directives/bootstrap',
        'square/directives/controls',
        'square/directives/counter',
        'square/directives/dataHover',
        'square/directives/datascroller',
        'square/directives/duallistbox',
        'square/directives/form',
        'square/directives/header',
        'square/directives/input',
        'square/directives/inputCep',
        'square/directives/inputCnpj',
        'square/directives/inputCpf',
        'square/directives/inputCurrency',
        'square/directives/inputDate',
        'square/directives/inputDatetime',
        'square/directives/inputDatetimeLocal',
        'square/directives/inputDigits',
        'square/directives/inputEmail',
        'square/directives/inputMask',
        'square/directives/inputMonth',
        'square/directives/inputNumber',
        'square/directives/inputPhone',
        'square/directives/inputPhoneBr',
        'square/directives/inputTime',
        'square/directives/inputYear',
        'square/directives/loading',
        'square/directives/modal',
        'square/directives/nicescroll',
        'square/directives/select2',
        'square/directives/sidebar',
        'square/directives/subheader',
        'square/directives/tablesorter',
        'square/directives/validate',

        'square/services/services',
        'square/services/bootstrap',
        'square/services/dialog',
        'square/services/error',
        'square/services/notify',
        'square/services/pager',
        'square/services/security',
        'square/services/timezone',
        'square/services/translate',
        'square/services/webstorage',
        'square/services/websocket',
        'square/services/cookie'

  ], function (template, angular) {
	'use strict';
	
	var square = angular.module('square', ['square.filters', 'square.directives', 'square.services']);
	
	square.config(function ($routeProvider, $httpProvider) {
		
		$routeProvider.when('/error', {error: true, template: template, controller: function ($window, $scope, $error) {
			$window.document.title = I18n.t('square.exception.title');
			$scope.error = $error.get() || '';
			
			$scope.openStackTrace = function () {
				$error.stacktrace($scope.error.stackTrace);
			};
		}});
		
		$routeProvider.when('/error403', {error: true, template: template, controller: function ($window, $scope) {
			$window.document.title = I18n.t('square.exception.code.403');
			$scope.error = {message: I18n.t('square.exception.code.403')};
		}});
		
		$routeProvider.otherwise({error: true, template: template, controller: function ($window, $scope) {
			$window.document.title = I18n.t('square.exception.pageNotFound');
			$scope.error = {message: I18n.t('square.exception.pageNotFound')};
		}});
		
		$httpProvider.interceptors.push('httpInterceptor');
	});
	
	
	square.factory('httpInterceptor', function ($q, $config, $injector) {
		return {
			'request': function (config) {
				config.headers['square-username'] = $config.appUsername;
				return config || $q.when(config);
			},
		 
			'responseError': function (rejection) {
				if (rejection.config.headers['square-tracking'] && rejection.config.headers['square-checking']) {
					return $q.reject(rejection);
				}
					
				if (rejection.status === 0) {
					var $http = $injector.get('$http');
					$http.get('', {headers: {'square-tracking': true, 'square-checking': true}}).error(function () {
						window.location.reload();
					});
					
				} else if (rejection.status === 401) {
					window.location.reload();
				}
				
				return $q.reject(rejection);
			}
		};
	});
	
	square.run(function ($rootScope, $http, $location, $config, $webstorage) {
		var squareUsername = $webstorage.local.get('square.username') || null;
		var appUsername = $config.appUsername || null;
		if (squareUsername !== appUsername) {
			$webstorage.local.clear();
			$webstorage.session.clear();
		}
		
		if (appUsername) {
			$webstorage.local.add('square.username', $config.appUsername);
		}
		
		$rootScope.$on('$routeChangeSuccess', function () {
			$http.get($location.path().substring(1, $location.path().length), {headers: {'square-tracking': true}});
		});
		
		$(document).ajaxSend(function (event, jqxhr) {
			jqxhr.setRequestHeader('square-username', $config.appUsername);
		});
		
		$(document).ajaxError(function (event, jqxhr) {
			if ((jqxhr.status === 0 && jqxhr.statusText === 'error')) {
				
				$rootScope.$apply(function () {
					$http.get('', {headers: {'square-tracking': true, 'square-checking': true}}).error(function () {
						window.location.reload();
					});
				});
				
			} else if (jqxhr.status === 401) {
				window.location.reload();
			}
		});
	});


	var config = angular.extend({dev: SQUARE_CONFIG.mode === 'DEVELOPMENT', prod: SQUARE_CONFIG.mode === 'PRODUCTION' }, SQUARE_CONFIG);
	square.constant('$config', config);
});