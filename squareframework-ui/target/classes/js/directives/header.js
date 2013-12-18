define(['square/directives/directives', 'text!square/views/header.html'], function (directives, template) {
	'use strict';
	
	directives.directive('squareHeader', function ($config, $location) {
			    
		return {
			restrict: 'A',
			replace: true,
			template: template,
			scope: true,
			 
			link: function postLink(scope, element, attrs) {
				
				scope.$watch(attrs.squareHeader, function (value) {
					value = angular.isDefined(value) ? value : {};
					
					scope.title = value.title;
					scope.infos = value.infos;
					scope.links = value.links;
					
					if ($config.appUsername && $config.SSOLogoutUrl) {
						scope.logoutUrl = I18n.interpolate($config.SSOLogoutUrl, {end_url: $location.absUrl().split(/\?|#/)[0]});
					}
				});
				
			}
		
		};
		
	});
	
});