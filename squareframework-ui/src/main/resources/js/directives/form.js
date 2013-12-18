define(['square/directives/directives'], function (directives) {
	'use strict';
	
	directives.directive('form', function ($notify) {
		
		return {
			restrict: 'E',
					 
			link: function (scope, element, attrs) {
				var INVALID_CLASS = '.ng-invalid',
					PRISTINE_CLASS = 'ng-pristine',
					DIRTY_CLASS = 'ng-dirty';

				element.attr('novalidate', 'novalidate');

				var form = scope[attrs.name];
				if (!form) {
					return;
				}

				form.isValid = function (options) {
					if (form.$valid) {
						return true;
					}

					var opts = angular.extend({focus: true, notify: null}, options);

					var input = element.find('.ng-invalid:visible:first');
					if (opts.notify || (input.length === 0 && opts.notify === null)) {
						$notify.warning(I18n.t('square.exception.validation'));
					}

					if (opts.focus && input.hasClass('select2-container')) {
						input.find(':input').focus().select();

					} else if (opts.focus) {
						input.focus().select();
					}

					return false;
				};

				form.isInvalid = function () {
					return !form.isValid();
				};

				element.submit(function () {
					var selected = element.find(INVALID_CLASS);

					selected.each(function () {
						$(this).removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);
					});
				});
			}
		};
	});
});