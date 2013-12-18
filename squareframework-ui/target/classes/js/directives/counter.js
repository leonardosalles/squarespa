define(['square/directives/directives'], function (directives) {
	'use strict';
	
	directives.directive('squareCounter', function () {
		return {
			restrict: 'A',

			link: function (scope, element, attr) {
				var maxlength = element.attr('maxlength') || 10;
				 
				var opts = angular.extend({
					maxCharacters: maxlength,
					statusText: I18n.t('square.maxlength.statusText'),
					alertText: I18n.t('square.maxlength.alertText'),
					slider: true,
					events: ['keyup', 'focus'],
					statusClass: 'counter-status',
				}, scope.$eval(attr.squareMaxlength));
				 
				$(element).maxlength(opts);
			}
		};

	});
	
});