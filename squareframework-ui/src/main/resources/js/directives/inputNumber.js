define(['square/directives/directives'], function (directives) {
	'use strict';
	
	directives.directive('squareInputNumber', function () {
		
		return {
			restrict: 'A',
			require: 'ngModel',
			 
			link: function (scope, element, attr, ctrl) {
				/* jshint camelcase: false */
				var opts = angular.extend({
					aSep: I18n.lookup('square.number').group_sep,
					aDec: I18n.lookup('square.number').decimal_sep
				}, scope.$eval(attr.squareInputNumber));

				element.autoNumeric('init', opts);
				
				element.bind('blur keyup change', function () {
					scope.$apply(function () {
						ctrl.$setViewValue(element.autoNumeric('get'));
					});
				});
				
				ctrl.$formatters.push(function (value) {
					if (!value)	{ return ''; }
					element.autoNumeric('set', value);
					return element.val();
				});
				 
				ctrl.$parsers.push(function (value) {
					if (!value || angular.isNumber(value)) {
						element.removeAttr('data-square-validate-number');
						ctrl.$setValidity('number', true);
						return value;
					}

					element.attr('data-square-validate-number', scope.$eval(attr.squareInputNumberMessage) || I18n.t('square.validation.type.number'));
					ctrl.$setValidity('number', false);
					return undefined;
				});
				 
				 
				scope.$on('$destroy', function () {
				});
			}
		};
	});
	
});
