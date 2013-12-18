define(['square/directives/directives'], function (directives) {
	'use strict';

	directives.directive('squareInputDate', function ($filter) {

		return {
			restrict: 'A',
			require: '?ngModel',
		      
			link: function (scope, element, attr, ctrl) {
				var clazz = attr['class'] || 'input-small';
				
				element.wrap('<div class="input-append date datepicker ' + clazz + '"></div>');
				element.after('<span class="add-on"><i class="icon-calendar"></i></span>');
				
				element.setMask({mask: '99/99/9999', autoTab: false});
				element.css('width', '100%');
				element.parent().datetimepicker({format: I18n.lookup('square.date').formats.mediumDate, pickTime: false});
				 
				scope.$on('$destroy', function () {
					var picker = $(element).parent().data('datetimepicker');
					if (picker) { picker.destroy(); }
				});
				
				element.bind('$destroy', function () {
					var picker = $(element).parent().data('datetimepicker');
					if (picker) { picker.destroy(); }
				});
				 
				if (attr.ngDisabled) {
					scope.$watch(attr.ngDisabled, function (value) {
						if (value) {
							element.attr('disabled', true);
						} else {
							element.removeAttr('disabled');
						}
					});
				}
				
				if (attr.ngReadonly) {
					scope.$watch(attr.ngReadonly, function (value) {
						if (value) {
							element.attr('disabled', true);
						} else {
							element.removeAttr('disabled');
						}
					});
				}
				 
				if (!ctrl) { return; }
				
				element.parent().on('changeDate', function (e) {
					var picker = $(element).parent().data('datetimepicker');
					picker.hide();
					 
					scope.$apply(function () {
						var date = e.localDate;
						if (date) {
							ctrl.$setViewValue(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
						}
					});
				});
				 
				ctrl.$render = function () {
					var picker = $(element).parent().data('datetimepicker');
					picker.setDate(ctrl.$modelValue ? new Date(ctrl.$modelValue) : null);
				};
				 
				ctrl.$parsers.unshift(function (value) {
					if (!value) {
						element.removeAttr('data-square-validate-date');
						ctrl.$setValidity('date', true);
						return undefined;

					} else if (angular.isDate(value)) {
						element.removeAttr('data-square-validate-date');
						ctrl.$setValidity('date', true);
						return $filter('date')(value, 'yyyy-MM-ddTHH:mm:ss');

					} else if (angular.isString(value) && value.length === 10) {
						var picker = $(element).parent().data('datetimepicker');
						 
						var date = null;
						if (picker.parseDate(value)) {
							picker.setValue(value);
							date = picker.getLocalDate();
						}
						 
						if (angular.isDate(date)) {
							element.removeAttr('data-square-validate-date');
							ctrl.$setValidity('date', true);
							return $filter('date')(date, 'yyyy-MM-ddTHH:mm:ss');
						} else {
							element.attr('data-square-validate-date', scope.$eval(attr.squareInputDateMessage) || I18n.t('square.validation.type.date', {pattern: I18n.lookup('square.date').formats.mediumDate}));
							ctrl.$setValidity('date', false);
							return undefined;
						}
				         
					} else {
						element.attr('data-square-validate-date', scope.$eval(attr.squareInputDateMessage) || I18n.t('square.validation.type.date', {pattern: I18n.lookup('square.date').formats.mediumDate}));
						ctrl.$setValidity('date', false);
						return undefined;
					}
					
				});
			}
		};
	});
});