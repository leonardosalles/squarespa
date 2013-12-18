define(['square/directives/directives', 'text!square/views/datascroller.html'], function (directives, template) {
    
	'use strict';
	directives.directive('squareDatascroller', function () {

		return {
			
			restrict: 'A',
			replace: true,
			template: template,
			scope: {},

			link: function (scope, element, attrs) {
				scope.pager = scope.$parent.$eval(attrs.squareDatascroller).pager;
				scope.placement = scope.$parent.$eval(attrs.squareDatascroller).placement !== 'top' ? 'bottom' : 'top';
				scope.paginateByList = [10, 25, 50, 100];

				//Create page object used in template
				function makePage(number, text, title, isActive, isDisabled) {
					return {number: number, text: text, title: title, active: isActive, disabled: isDisabled};
				}

				function sort(array) {
					for (var i = 0, m = array.length; i < m; i++) {
						for (var j = i + 1, n = array.length; j < n; j++) {
							if (array[i] > array[j]) {
								var temp = array[j];
								array[j] = array[i];
								array[i] = temp;
							}
						}
					}
				
					return array;
				}
				
				if (scope.pager && scope.pager.currentLimit) {
					if (scope.paginateByList.indexOf(scope.pager.currentLimit) < 0) {
						scope.paginateByList.push(scope.pager.currentLimit);
						scope.paginateByList = sort(scope.paginateByList);
					}
				}

				scope.$watch('pager.numPages + pager.currentPage + pager.maxSize + pager.currentLimit', function () {
					scope.pages = [];
		        
					//Default page limits
					var startPage = 1, endPage = scope.pager.numPages;
		
					// recompute if maxSize
					if (scope.pager.maxSize && scope.pager.maxSize < scope.pager.numPages) {
						startPage = Math.max(scope.pager.currentPage - Math.floor(scope.pager.maxSize / 2), 1);
						endPage = startPage + scope.pager.maxSize - 1;
		
						// Adjust if limit is exceeded
						if (endPage > scope.pager.numPages) {
							endPage = scope.pager.numPages;
							startPage = endPage - scope.pager.maxSize + 1;
						}
					}
		

					for (var number = startPage; number <= endPage; number++) {
						var page = makePage(number, number, I18n.t('square.datascroller.gotopage', {page: number}), scope.isActive(number), false);
						scope.pages.push(page);
					}
		
					if (scope.pager.numPages > 5) {
						var previousPage = makePage(scope.pager.currentPage - 1, '«', I18n.t('square.datascroller.serverprevious'), false, scope.noPrevious());
						scope.pages.unshift(previousPage);
		
						var nextPage = makePage(scope.pager.currentPage + 1, '»', I18n.t('square.datascroller.servernext'), false, scope.noNext());
						scope.pages.push(nextPage);
					}
		
					if (scope.pager.numPages > 5) {
						var firstPage = makePage(1, '««', I18n.t('square.datascroller.serverfirst'), false, scope.noPrevious());
						scope.pages.unshift(firstPage);
		
						var lastPage = makePage(scope.pager.numPages, '»»', I18n.t('square.datascroller.serverlast'), false, scope.noNext());
						scope.pages.push(lastPage);
					}
		
					if (scope.pager.currentPage > scope.pager.numPages) {
						scope.selectPage(scope.pager.numPages);
					}
				});
		      
				scope.noPrevious = function () {
					return scope.pager.currentPage === 1;
				};

				scope.noNext = function () {
					return scope.pager.currentPage === scope.pager.numPages;
				};
		      
				scope.isActive = function (page) {
					return scope.pager.currentPage === page;
				};
		
				scope.selectPage = function (page) {
					if (!scope.isActive(page) && page > 0 && page <= scope.pager.numPages) {
						scope.pager.goTo(page);
					}
				};
		      
				scope.changeLimit = function () {
					scope.pager.goTo(1);
				};
			}
		};
	});
});