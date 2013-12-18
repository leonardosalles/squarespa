define(['square/directives/directives'], function (directives) {
	'use strict';
	
	var input = function () {
		
		return {
			restrict: 'E',
			require: '?ngModel',
			
			 
			link: function (scope, element, attr, ctrl) {
				if (!ctrl) {
					return;
				}
				scope.$watch(function () {
					var log = '';
					 
					angular.forEach(ctrl.$error, function (value, key) {
						if (value) {
							log += key + ',';
						}
					});
					 
					 
					return log;
					 
				}, function () {
					if (ctrl.$valid) {
						if ($(element).data('tooltip')) {
							$(element).tooltip('destroy');
						}
					 
					} else {
						if ($(element).data('tooltip')) {
							$(element).tooltip('destroy');
						}
						 
						$(element).tooltip({animation: false, placement: 'top', trigger: 'manual', delay: {show: 100, hide: 0}});
						$(element).data('tooltip').options.title = function () {
							var log = '';
							angular.forEach(ctrl.$error, function (value, key) {
								if (value) {
									log = $(element).attr('data-square-validate-' + key) || I18n.t('square.validation.defaultMessage');
								}
							});
							return log;
						};
						 
						if ($(element).is(':focus')) {
							$(element).tooltip('show');
						}
					}
				});

				$(element).focus(function () {
					if ($(this).hasClass('ng-dirty')) {
						$(this).tooltip('show');
					}
				});
					 
				$(element).blur(function () {
					if ($(this).data('tooltip')) {
						$(this).tooltip('hide');
					}
				});
				
			}
		};
	};
	
	directives.directive('input', input);
	directives.directive('textarea', input);
	
});