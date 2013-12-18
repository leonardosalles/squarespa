define(['services/services'], function (services) {
	'use strict';
	
	services.factory('Todo', function ($resource, $http, $config) {
		return $resource($config.restfulUriPrefix + '/todo/:id', {id: '@id'}, {});
	});

});