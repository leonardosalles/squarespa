define(['square/directives/directives'], function (directives) {
	'use strict';

	directives.directive('squareInputDatetime', function ($filter) {

		return {
			restrict: 'A',
			require: '?ngModel',
			 
			link: function (scope, element, attr, ctrl) {
				var clazz = attr['class'] || 'input-medium';
				var squareInputDatetimeSeconds = scope.$eval(attr.squareInputDatetimeSeconds);
				var dateTimeLookup = squareInputDatetimeSeconds ? I18n.lookup('square.date').formats.medium.replace('HH', 'hh') : I18n.lookup('square.date').formats.mediumDateTime.replace('HH', 'hh');
				var dateTimeMask = squareInputDatetimeSeconds ? '99/99/9999 29:59:59' : '99/99/9999 29:59';
				var locale = I18n.locale;
				
				element.wrap('<div class="input-append date datepicker ' + clazz + '"></div>');
				element.after('<span class="add-on"><i class="icon-calendar"></i></span>');
				 
				element.setMask({mask: dateTimeMask, autoTab: false});
				element.css('width', '100%');
				element.parent().datetimepicker({format: dateTimeLookup, pickSeconds: squareInputDatetimeSeconds || false, pick12HourFormat: locale === 'pt-BR' ? false : true});

				scope.$on('$destroy', function () {
					var picker = $(element).parent().data('datetimepicker');
					if (picker) { picker.destroy(); }
				});
				
				element.bind('$destroy', function () {
					var picker = $(element).parent().data('datetimepicker');
					if (picker) { picker.destroy(); }
				});
				
				if (locale === 'pt-BR' && !squareInputDatetimeSeconds) {
					$('.timepicker-picker').find('.separator:eq(3)').next('td').remove();
				}

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
					scope.$apply(function () {
						ctrl.$setViewValue(e.localDate);
					});
				});
				 
				ctrl.$render = function () {
					var picker = $(element).parent().data('datetimepicker');
					picker.setDate(ctrl.$modelValue ? new Date(ctrl.$modelValue) : null);
				};
				 
				ctrl.$parsers.unshift(function (value) {
					if (!value) {
						element.removeAttr('data-square-validate-datetime');
						ctrl.$setValidity('datetime', true);
						return undefined;
						 
					} else if (angular.isDate(value)) {
						element.removeAttr('data-square-validate-datetime');
						ctrl.$setValidity('datetime', true);
						return $filter('date')(value, 'yyyy-MM-ddTHH:mm:ss');
					 
					} else if (angular.isString(value) && value.length === 19) {
						var picker = $(element).parent().data('datetimepicker');
						 
						var date = null;
						if (picker.parseDate(value)) {
							picker.setValue(value);
							date = picker.getLocalDate();
						}
						 
						if (angular.isDate(date)) {
							element.removeAttr('data-square-validate-datetime');
							ctrl.$setValidity('datetime', true);
							return $filter('date')(date, 'yyyy-MM-ddTHH:mm:ss');

						} else {
							element.attr('data-square-validate-datetime', scope.$eval(attr.squareInputDatetimeMessage) || I18n.t('square.validation.type.date', {pattern: I18n.lookup('square.date').formats.medium}));
							ctrl.$setValidity('datetime', false);
							return undefined;
						}
				         
					} else {
						element.attr('data-square-validate-datetime', scope.$eval(attr.squareInputDatetimeMessage) || I18n.t('square.validation.type.date', {pattern: I18n.lookup('square.date').formats.medium}));
						ctrl.$setValidity('datetime', false);
						return undefined;
					}
				});
				
			}
		};
	});
	
});