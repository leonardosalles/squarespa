({ 
  name: '../square/js/main',  
  baseUrl: '../${project.build.finalName}/static/js',
  mainConfigFile: '../${project.build.finalName}/static/square/js/main.js',
  out: '../${project.build.finalName}/static/js/out.js',

  optimize: "none",
  reserveLicenseComments: false,
  inlineText: true, 
  removeCombined: false,  

  paths: {
	  'angular': '../square/vendor/angular/angular.min',
	  'angular-resource': '../square/vendor/angular/angular-resource.min',
	  'angular-cookies': '../square/vendor/angular/angular-cookies.min',
	  'angular-loader': '../square/vendor/angular/angular-loader.min',
	  'angular-sanitize': '../square/vendor/angular/angular-sanitize.min',
	  'angular-bootstrap-prettify': '../square/vendor/angular/angular-bootstrap-prettify.min',

	  'angular-strap': '../square/vendor/angular-strap/angular-strap.min',

	  'bootstrap': '../square/vendor/bootstrap/js/bootstrap.min',
	  'jquery': '../square/vendor/jquery/jquery.min',

	  'moment': '../square/vendor/moment/moment.min',

	  'atmosphere': '../square/vendor/atmosphere/jquery.atmosphere-min',

	  requireLib: "../square/vendor/requirejs/require.min"
  },
  
  include: ["requireLib"]
})