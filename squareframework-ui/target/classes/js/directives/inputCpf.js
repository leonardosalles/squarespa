define(['square/directives/directives'], function (directives) {
	'use strict';

	directives.directive('squareInputCpf', function ($filter) {

		return {
			restrict: 'A',
			require: 'ngModel',
			 
			link: function (scope, element, attr, ctrl) {
				var opts = angular.extend({mask: '999.999.999-99', autoTab: false}, scope.$eval(attr.squareInputCpf));
				 
				$(element).setMask(opts);
				$(element).addClass('input-medium');
				
				ctrl.$formatters.push(function (value) {
					var newValue = angular.isNumber(value) ? lpad(value.toString(), 11) : value;
					newValue = jQuery.mask.string(newValue, opts.mask);
				     
					var validated = !newValue || $filter('cpfValidator')(newValue);
					if (validated) {
						element.removeAttr('data-square-validate-cpf');
					} else {
						element.attr('data-square-validate-cpf', scope.$eval(attr.squareInputCpfMessage) || I18n.t('square.validation.type.cpf'));
					}
					ctrl.$setValidity('cpf', validated);
					return newValue;
				});
				 
				 
				ctrl.$parsers.push(function (value) {
					if (!value ||  $filter('cpfValidator')(value)) {
						element.removeAttr('data-square-validate-cpf');
						ctrl.$setValidity('cpf', true);
						return value ? Number(value.replace(new RegExp($.mask.options.fixedChars, 'g'), '')) : null;

					} else {
						element.attr('data-square-validate-cpf', scope.$eval(attr.squareInputCpfMessage) || I18n.t('square.validation.type.cpf'));
						ctrl.$setValidity('cpf', false);
						return undefined;
					}
				});
				 

				scope.$on('$destroy', function () {
					 
				});
				 
				 
				var lpad = function (value, padding) {
					var zeroes = '0';
					for (var i = 0; i < padding; i++) { zeroes += '0'; }
					return (zeroes + value).slice(padding * -1);
				};
			}
		};
	});
	
});
