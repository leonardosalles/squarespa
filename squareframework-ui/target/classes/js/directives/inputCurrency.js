define(['square/directives/directives'], function (directives) {
	'use strict';

	directives.directive('squareInputCurrency', function () {
		
		return {
			restrict: 'A',
			require: 'ngModel',
			
			link: function (scope, element, attr, ctrl) {
				/* jshint camelcase: false */
				var opts = angular.extend({
					aSep: I18n.lookup('square.number').group_sep,
					aDec: I18n.lookup('square.number').decimal_sep,
					aSign: I18n.lookup('square.number').currency_sym + ' '
				}, scope.$eval(attr.squareInputCurrency));

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
						element.removeAttr('data-square-validate-currency');
						ctrl.$setValidity('currency', true);
						return value;
					}

					element.attr('data-square-validate-currency', scope.$eval(attr.squareInputCurrencyMessage) || I18n.t('square.validation.type.currency'));
					ctrl.$setValidity('currency', false);
					return undefined;
				});
				 
				 
				scope.$on('$destroy', function () {
				});
				
			}
		};
	});
});
