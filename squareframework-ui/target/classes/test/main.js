require.config({
  
	baseUrl: 'src/js',
	
	paths: {		
		'angular': '../square/vendor/angular/angular',
		'angular-resource': '../square/vendor/angular/angular-resource',
		'angular-cookies': '../square/vendor/angular/angular-cookies',
		'angular-loader': '../square/vendor/angular/angular-loader',
		'angular-sanitize': '../square/vendor/angular/angular-sanitize',
		'angular-bootstrap-prettify': '../square/vendor/angular/angular-bootstrap-prettify',

		'angular-mocks': '../square/vendor/angular/angular-mocks',
		'angular-scenario': '../square/vendor/angular/angular-scenario',
		
		'angular-strap': '../square/vendor/angular-strap/angular-strap',
		
		'bootstrap': '../square/vendor/bootstrap/js/bootstrap',
		'bootstrap-datetimepicker': '../square/vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker',
		'bootstrap-hover-dropdown': '../square/vendor/bootstrap-hover-dropdown/bootstrap-hover-dropdown',
		'bootstrap-duallistbox': '../square/vendor/bootstrap-duallistbox/bootstrap-duallistbox', 
		'bootstrap-modal': '../square/vendor/bootstrap-modal/js/bootstrap-modal',
		'bootstrap-modalmanager': '../square/vendor/bootstrap-modal/js/bootstrap-modalmanager', 
		
		'jquery': '../square/vendor/jquery/jquery-1.8.3',
		'jquery-browser': '../square/vendor/jquery-browser/jquery.browser',
		'jquery-meiomask': '../square/vendor/jquery-meiomask/jquery.meio.mask',			
		'jquery-autonumeric': '../square/vendor/jquery-autonumeric/jquery-autonumeric',
		'jquery-metadata': '../square/vendor/jquery-metadata/jquery.metadata',
		'jquery-tablesorter': '../square/vendor/jquery-tablesorter/jquery.tablesorter',
		'jquery-maxlength': '../square/vendor/jquery-maxlength/jquery.maxlength',
		'jquery-nicescroll': '../square/vendor/jquery-nicescroll/jquery.nicescroll',
		'jquery-scrollspy': '../square/vendor/jquery-scrollspy/jquery-scrollspy',
		
		'moment': '../square/vendor/moment/moment',
	    'moment-timezone': '../square/vendor/moment-timezone/moment-timezone',
	    'moment-timezone-data': '../square/vendor/moment-timezone/moment-timezone-data',
	    
		'phone-number': '../square/vendor/phone-number/PhoneNumber',
		'phone-number-metadata': '../square/vendor/phone-number/PhoneNumberMetaData',
		
		'atmosphere': '../square/vendor/atmosphere/jquery.atmosphere',
		
		'select2': '../square/vendor/select2/select2',
		'i18n' : '../square/vendor/i18njs/i18n',
		
		'text' : '../square/vendor/requirejs-text/text',
		
		'square': '../square/js',
		'views': '../views'
	},
	

	shim: {
		'angular': {
			deps: ['jquery'], exports:'angular'
        }, 
        
        'angular-resource': {
			deps: ['angular']
        },
        
        'angular-cookies': {
			deps: ['angular']
        }, 
        
        'angular-loader': {
			deps: ['angular']
        },
       
        'angular-sanitize': {
			deps: ['angular']
        },
        
        'angular-bootstrap-prettify': {
			deps: ['angular']
        },
        
        
        'angular-mocks': {
			deps: ['angular']
        },

        'angular-scenario': {
			deps: ['angular']
        },
        
        
        'angular-strap': {
        	deps: ['angular', 'bootstrap']
        },
        
        'angular-ui-bootstrap': {
        	deps: ['angular', 'bootstrap']
        },
        
        'angular-ui-utils': {
        	deps: ['angular', 'bootstrap', 'jquery']
        },
                
        'bootstrap': {
			deps: ['jquery']
		},	
				
		'bootstrap-datetimepicker': {
			deps: ['bootstrap']
		},	
		
		'bootstrap-hover-dropdown': {
			deps: ['bootstrap']
		},
		
		'bootstrap-duallistbox': {
			deps: ['bootstrap']
		},
		
		'bootstrap-modal': {
			deps: ['bootstrap']
		},
				
		'bootstrap-modalmanager': {
			deps: ['bootstrap-modal']
		},
		
		'jquery': {
			exports: '$'
		},
		
		'jquery-browser': {
			deps: ['jquery']
		},
		
		'jquery-meiomask': {
			deps: ['jquery', 'jquery-browser']
		},
		
		'jquery-autonumeric': {
			deps: ['jquery']
		},
		
		'jquery-metadata': {
			deps: ['jquery']
		},
		
		'jquery-tablesorter': {
			deps: ['jquery', 'jquery-metadata']
		},
		
		'jquery-maxlength': {
			deps: ['jquery']
		},
		
		'jquery-nicescroll': {
			deps: ['jquery']
		},
		
		'jquery-scrollspy': {
			deps: ['jquery']
		},
		
		'jquery-nicescroll': {
			deps: ['jquery']
		},
		
		'phone-number': {
			deps: ['phone-number-metadata']
		},
		
		'moment-timezone': {
			deps: ['moment']
		},
		
		'moment-timezone-data': {
			deps: ['moment-timezone']
		},
		
		'i18n': {
			exports: 'I18n'
		},
		
		'select2': {
			deps: ['jquery']
		},
		
		'atmosphere' : {
			deps: ['jquery']
		}
	}
	
});

var SQUARE_CONFIG = {mode: 'DEVELOPMENT', resourceUriPrefix: 'src', restfulUriPrefix: 'rest'}; 
