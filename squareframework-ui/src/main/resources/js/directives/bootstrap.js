define(['square/directives/directives', 'text!square/views/bootstrap.html'], function (directives, template) {
	'use strict';
	
	directives.directive('squareBootstrap', function ($bootstrap) {
		return {
			restrict: 'A',
			replace: true,
			scope: true,
			template: template,

			link: function (scope, element) {
				scope.$bootstrap = $bootstrap;

				scope.$on('squareReady', function () {
					element.remove();
					$('body').addClass('ready');
				});
			}
		};
	});
	
	
});