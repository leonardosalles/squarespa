define(['square/directives/directives'], function (directives) {
	'use strict';
	
	directives.directive('squareLoading', function ($http, $filter) {
        
		return {
			restrict: 'A',
			replace: true,
			template: '<div class="body-loader">' +
						'<div class="body-loader-inner">' +
							'<p><i class="icon-4x icon-spinner icon-spin"></i></p>' +
							'<p>{{"square.loading" | i18n}}</p>' +
						'</div>' +
					  '</div>',

			controller: function ($scope, $element) {
				
				$scope.$watchCollection(function () {
					return $http.pendingRequests;
					
				}, function () {
				
					var array = $filter('filter')($http.pendingRequests, function (request) {
						return !request.headers['square-tracking'] && (request.headers['square-loading'] === undefined || request.headers['square-loading']);
					});
					
					if (array.length > 0) {
						$element.addClass('active');
					} else {
						$element.removeClass('active');
					}
				}, true);
			}
		};
	});
});