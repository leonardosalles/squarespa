define(['square/directives/directives'], function (directives) {
	'use strict';

	function Validate(name, key, callback) {

		this.validate = function ($filter) {

			return {
				require: '?ngModel',

				link: function (scope, elm, attrs, ctrl) {
					if (!ctrl) { return; }

					var validateFn = function (valueToValidate) {
						var expression = callback(scope, elm, attrs, ctrl, valueToValidate, $filter);
						if (!expression) {
							elm.removeAttr('data-square-validate-' + key);
						} else {
							elm.attr('data-square-validate-' + key, expression);
						}

						ctrl.$setValidity(key, !expression);
						return valueToValidate;
					};
			      
					ctrl.$formatters.push(validateFn);
					ctrl.$parsers.push(validateFn);
			      
					scope.$watch(attrs[name], function () {
						validateFn(ctrl.$modelValue);
					});
			      
					attrs.$observe(name + 'Message', function () {
						validateFn(ctrl.$modelValue);
					});
					
					if (attrs.squareValidateWatch) {
						var watch = scope.$eval(attrs.squareValidateWatch);
						if (angular.isString(watch)) {
							scope.$watch(watch, function () {
								validateFn(ctrl.$modelValue);
							});
			          
						} else {
							validateFn(ctrl.$modelValue);
						}
					}
				}
			};
		};
	}

	function isEmpty(value) {
		if (angular.isArray(value)) { return value.length === 0; }
		return isUndefined(value) || value === '' || value === null || value !== value;
	}

	function isUndefined(value) {
		return typeof value === 'undefined';
	}
	
	function getWordsLength(val) {
		val = val.replace(/(^\s*)|(\s*$)/gi, '');
		val = val.replace(/[ ]{2,}/gi, ' ');
		val = val.replace(/\n /, '\n');
		return val.split(' ').length;
	}

	function getDatePattern(attrs) {
		if (attrs.squareInputDatetime) {
			return I18n.lookup('square.date').formats.medium;
			
		} else if (attrs.squareInputTime) {
			return I18n.lookup('square.date').formats.mediumTime;
			
		} else if (attrs.squareInputMonth) {
			return 'MM/yyyy';
			
		} else if (attrs.squareInputYear) {
			return 'yyyy';
		}
		return I18n.lookup('square.date').formats.mediumDate;
	}
	
	function isString(value) {
		return typeof(value) === 'string';
	}

	directives.directive('squareValidate', function () {

		return {
			restrict: 'A',
			require: 'ngModel',

			link: function (scope, elm, attrs, ctrl) {
				var validateFn, watch, validators = {}, validateExpr = scope.$eval(attrs.squareValidate);
				if (!validateExpr) { return; }

				if (angular.isString(validateExpr)) {
					validateExpr = { validator: validateExpr };
				}

				angular.forEach(validateExpr, function (exprssn, key) {

					validateFn = function (valueToValidate) {
						var expression = scope.$eval(exprssn, { '$value' : valueToValidate });
						if (angular.isFunction(expression.then)) {
							/* expression is a promise */
							expression.then(function () {
								elm.removeAttr('data-square-validate-' + key);
								ctrl.$setValidity(key, true);
							}, function (expression) {
								elm.attr('data-square-validate-' + key, expression);
								ctrl.$setValidity(key, false);
							});
							return valueToValidate;


						} else if (!expression) {
							elm.removeAttr('data-square-validate-' + key);
							ctrl.$setValidity(key, true);
							return valueToValidate;
						}

						elm.attr('data-square-validate-' + key, expression);
						ctrl.$setValidity(key, false);
						return valueToValidate;
					};


					validators[key] = validateFn;
					ctrl.$formatters.push(validateFn);
					ctrl.$parsers.push(validateFn);
				});

				/* Support for ui-validate-watch */
				if (attrs.squareValidateWatch) {
					watch = scope.$eval(attrs.squareValidateWatch);
					if (angular.isString(watch)) {
						scope.$watch(watch, function () {
							angular.forEach(validators, function (validatorFn) {
								validatorFn(ctrl.$modelValue);
							});
						});

					} else {

						angular.forEach(watch, function (expression, key) {

							if (angular.isString(expression)) {
								scope.$watch(expression, function () {
									validators[key](ctrl.$modelValue);
								});

							} else {
								angular.forEach(expression, function (expression2) {
									scope.$watch(expression2, function () {
										validators[key](ctrl.$modelValue);
									});
								});
							}
						});
					}
				}
			}
		};
	});

	
	/*	*/
	directives.directive('squareRegexp', new Validate('squareRegexp', 'regexp', function (scope, element, attrs, ctrl, value) {
		var regexp = scope.$eval(attrs.squareRegexp);
		return !regexp || isEmpty(value) || new RegExp(regexp, '').test(value) ? '' : attrs.squareRegexpMessage || I18n.t('square.validation.regexp');
	}).validate);

	
	directives.directive('squareMinwords', new Validate('squareMinlength', 'minwords', function (scope, element, attrs, ctrl, value) {
		var minwords = scope.$eval(attrs.squareMinwords);
		return !value || getWordsLength(value) >= minwords ? '' :  attrs.squareMinwordsMessage || I18n.t('square.validation.minwords', {minwords: minwords});
	}).validate);
	
	
	directives.directive('squareMaxwords', new Validate('squareMaxwords', 'maxwords', function (scope, element, attrs, ctrl, value) {
		var maxwords = scope.$eval(attrs.squareMaxwords);
		return !value || getWordsLength(value) <= maxwords ? '' : attrs.squareMaxwordsMessage || I18n.t('square.validation.maxwords', {maxwords: maxwords});
	}).validate);
	

	directives.directive('squareRangewords', new Validate('squareRangelength', 'rangewords', function (scope, element, attrs, ctrl, value) {
		var rangewords = scope.$eval(attrs.squareRangewords);
		if (angular.isArray(rangewords) === false) { return ''; }
		return !value || (getWordsLength(value) >= rangewords[0] && getWordsLength(value) <= rangewords[1]) ? '' : attrs.squareRangewordsMessage || I18n.t('square.validation.rangewords', {minwords: rangewords[0], maxwords: rangewords[1]});
	}).validate);

	
	directives.directive('squareRequired', new Validate('squareRequired', 'required', function (scope, element, attrs, ctrl, value) {
		var required = scope.$eval(attrs.squareRequired);
		return required && (isEmpty(value) || value === false) ? attrs.squareRequiredMessage || I18n.t('square.validation.required') : '';
	}).validate);


	directives.directive('squareEqualto', new Validate('squareEqualto', 'equalto', function (scope, element, attrs, ctrl, value) {
		var equals = scope.$eval(attrs.squareEqualto);
		return equals === value ? '' : attrs.squareEqualtoMessage || I18n.t('square.validation.equalto');
	}).validate);
	
	directives.directive('squareEqualtoUncase', new Validate('squareEqualtoUncase', 'equalto', function (scope, element, attrs, ctrl, value) {
		var equals = scope.$eval(attrs.squareEqualtoUncase);
		if (isString(equals) && isString(value)) { return equals.toUpperCase() === value.toUpperCase() ? '' : attrs.squareEqualtoUncaseMessage || I18n.t('square.validation.equalto'); }
	}).validate);

	
	directives.directive('squareMinlength', new Validate('squareMinlength', 'minlength', function (scope, element, attrs, ctrl, value) {
		var minlength = scope.$eval(attrs.squareMinlength);
		return !value || value.length >= minlength ? '' :  attrs.squareMinlengthMessage || I18n.t('square.validation.minlength', {minlength: minlength});
	}).validate);
	
	
	directives.directive('squareMaxlength', new Validate('squareMaxlength', 'maxlength', function (scope, element, attrs, ctrl, value) {
		var maxlength = scope.$eval(attrs.squareMaxlength);
		return !value || value.length <= maxlength ? '' : attrs.squareMaxlengthMessage || I18n.t('square.validation.maxlength', {maxlength: maxlength});
	}).validate);
	
	
	directives.directive('squareRangelength', new Validate('squareRangelength', 'rangelength', function (scope, element, attrs, ctrl, value) {
		var rangelength = scope.$eval(attrs.squareRangelength);
		if (angular.isArray(rangelength) === false) { return ''; }
		return !value || (value.length >= rangelength[0] && value.length <= rangelength[1]) ? '' : attrs.squareRangelengthMessage || I18n.t('square.validation.rangelength', {minlength: rangelength[0], maxlength: rangelength[1]});
	}).validate);
 
	
	directives.directive('squareMincheck', new Validate('squareMincheck', 'mincheck', function (scope, element, attrs, ctrl, value) {
		var mincheck = scope.$eval(attrs.squareMincheck);
		return !value || value.length >= mincheck ? '' :  attrs.squareMincheckMessage || I18n.t('square.validation.mincheck', {mincheck: mincheck});
	}).validate);
	
	
	directives.directive('squareMaxcheck', new Validate('squareMaxcheck', 'maxcheck', function (scope, element, attrs, ctrl, value) {
		var maxcheck = scope.$eval(attrs.squareMaxcheck);
		return !value || value.length <= maxcheck ? '' : attrs.squareMaxcheckMessage || I18n.t('square.validation.maxcheck', {maxcheck: maxcheck});
	}).validate);
	
	
	directives.directive('squareRangecheck', new Validate('squareRangecheck', 'rangecheck', function (scope, element, attrs, ctrl, value) {
		var rangecheck = scope.$eval(attrs.squareRangecheck);
		if (angular.isArray(rangecheck) === false) { return ''; }
		return !value || (value.length >= rangecheck[0] && value.length <= rangecheck[1]) ? '' : attrs.squareRangecheckMessage || I18n.t('square.validation.rangecheck', {mincheck: rangecheck[0], maxcheck: rangecheck[1]});
	}).validate);
  
	
	directives.directive('squareMin', new Validate('squareMin', 'min', function (scope, element, attrs, ctrl, value) {
		var min = scope.$eval(attrs.squareMin);
		return !value || (Number(value) >= Number(min)) ? '' :  attrs.squareMinMessage || I18n.t('square.validation.min', {min: min});
	}).validate);
	
	
	directives.directive('squareMax', new Validate('squareMax', 'max', function (scope, element, attrs, ctrl, value) {
		var max = scope.$eval(attrs.squareMax);
		return !value || (Number(value) <=  Number(max)) ? '' : attrs.squareMaxMessage || I18n.t('square.validation.max', {max: max});
	}).validate);
	
	
	directives.directive('squareRange', new Validate('squareRange', 'range', function (scope, element, attrs, ctrl, value) {
		var range = scope.$eval(attrs.squareRange);
		if (angular.isArray(range) === false) { return ''; }
		return !value || (Number(value) >=  Number(range[0]) && Number(value) <=  Number(range[1])) ? '' : attrs.squareRangeMessage || I18n.t('square.validation.range', {min: range[0], max: range[1]});
	}).validate);
 
	
	
	directives.directive('squareGreaterthan', new Validate('squareGreaterthan', 'greaterthan', function (scope, element, attrs, ctrl, value) {
		var greaterthan = scope.$eval(attrs.squareGreaterthan);
		return !greaterthan || (value && Number(value) > Number(greaterthan)) ? '' :  attrs.squareGreaterthanMessage || I18n.t('square.validation.greaterthan', {greaterthan: greaterthan});
	}).validate);
	
	
	directives.directive('squareLessthan', new Validate('squareLessthan', 'lessthan', function (scope, element, attrs, ctrl, value) {
		var lessthan = scope.$eval(attrs.squareLessthan);
		return !lessthan || (value && Number(value) <  Number(lessthan)) ? '' : attrs.squareLessthanMessage || I18n.t('square.validation.lessthan', {lessthan: lessthan});
	}).validate);
	
	
	directives.directive('squareAfterdate', new Validate('squareAfterdate', 'afterdate', function (scope, element, attrs, ctrl, value, $filter) {
		var afterdate = scope.$eval(attrs.squareAfterdate);
		return !afterdate || (value && Date.parse(value) > Date.parse(afterdate)) ? '' :  attrs.squareAfterdateMessage || I18n.t('square.validation.afterdate', {afterdate: $filter('date')(afterdate, getDatePattern(attrs))});
	}).validate);
	
	
	directives.directive('squareBeforedate', new Validate('squareBeforedate', 'beforedate', function (scope, element, attrs, ctrl, value, $filter) {
		var beforedate = scope.$eval(attrs.squareBeforedate);
		return !beforedate || (value && Date.parse(value) <  Date.parse(beforedate)) ? '' : attrs.squareBeforedateMessage || I18n.t('square.validation.beforedate', {beforedate: $filter('date')(beforedate, getDatePattern(attrs))});
	}).validate);
	
});