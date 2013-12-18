define(['square/services/services'], function (services) {
	'use strict';
	
	services.service('$notify', function ($bootstrap, $rootScope, $interpolate) {
		
		var template = '<div class="modal modal-{{type}} hide fade" tabindex="-1" data-backdrop="static" data-keyboard="false">' +
							'<div class="modal-header">' +
								'<h3>{{title}}</h3>' +
							'</div>' +
					
							'<div class="modal-body">' +
								'<p>{{msg}}</p>' +
								'<br/>' +
								'<div class="row-fluid text-center">' +
									'<button class="btn btn-large" onclick="location.reload();">Tentar Novamente</button>' +
								'</div>' +
							'</div>' +
						'</div>';
	   
	   
		var templateReady = '<div class="modal modal-{{type}} hide fade" tabindex="-1">' +
								'<div class="modal-header">' +
									'<div class="control-close">' +
										'<squaren>{{esc}}</squaren>' +
										'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
									'</div>' +
									'<h3>{{title}}</h3>' +
								'</div>' +
	
								'<div class="modal-body">' +
									'<p>{{msg}}</p>' +
									'<br/>' +
									'<div class="row-fluid text-center">' +
										'<button class="btn btn-large" data-dismiss="modal">Ok</button>' +
									'</div>' +
								'</div>' +
							'</div>';
		
	   
		this.warning = function (msg) {
			var compiled = $interpolate($bootstrap.isReady() ? templateReady : template)({type: 'warning', title: I18n.t('square.exception.warning'), msg: msg, esc: I18n.t('square.modalEsc')});
			$(compiled).modal();
		};
		
		this.info = function (msg) {
			var compiled = $interpolate($bootstrap.isReady() ? templateReady : template)({type: 'info', title: I18n.t('square.exception.info'), msg: msg, esc: I18n.t('square.modalEsc')});
			$(compiled).modal();
		};
		
		this.error = function (msg) {
			var compiled = $interpolate($bootstrap.isReady() ? templateReady : template)({type: 'error', title: I18n.t('square.exception.error'), msg: msg, esc: I18n.t('square.modalEsc')});
			$(compiled).modal();
		};
		
		this.success = function (msg) {
			var compiled = $interpolate($bootstrap.isReady() ? templateReady : template)({type: 'success', title: I18n.t('square.exception.success'), msg: msg, esc: I18n.t('square.modalEsc')});
			$(compiled).modal();
		};
		
	});
	
});