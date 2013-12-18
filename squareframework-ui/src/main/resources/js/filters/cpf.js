define(['square/filters/filters'], function (filters) {
	'use strict';
	
	filters.filter('cpf', function () {
	
		return function (value) {
			if (!value) {
				return value;
			}
		
			var lpad = function (value, padding) {
				var zeroes = '0';
				for (var i = 0; i < padding; i++) {
					zeroes += '0';
				}
				return (zeroes + value).slice(padding * -1);
			};
		
			var newValue = angular.isNumber(value) ? lpad(value.toString(), 11) : lpad(value, 11);
			return jQuery.mask.string(newValue, '999.999.999-99');
		};
		
	});
	
	filters.filter('cpfValidator', function () {
		
		return function (value) {
			value = value.replace(/[^\d]+/g, '');
			 
			if (value.length !== 11 || value === '') {
				return false;
			}
			 
		    // Elimina cpfs invalidos conhecidos
			if (value === '00000000000' ||
		        value === '11111111111' ||
		        value === '22222222222' ||
		        value === '33333333333' ||
		        value === '44444444444' ||
		        value === '55555555555' ||
		        value === '66666666666' ||
		        value === '77777777777' ||
		        value === '88888888888' ||
		        value === '99999999999') {
				return false;
			}
			     
			// Valida 1o digito
			var add = 0;
			for (var i = 0; i < 9; i++) {
				add += parseInt(value.charAt(i), 10) * (10 - i);
			}
			
			var rev = 11 - (add % 11);
			if (rev === 10 || rev === 11) {
				rev = 0;
			}
		    
			if (rev !== parseInt(value.charAt(9), 10)) {
				return false;
			}
		     
		    // Valida 2o digito
			add = 0;
			for (i = 0; i < 10; i++) {
				add += parseInt(value.charAt(i), 10) * (11 - i);
			}
		    
			rev = 11 - (add % 11);
			if (rev === 10 || rev === 11) {
				rev = 0;
			}
		    
			if (rev !== parseInt(value.charAt(10), 10)) {
				return false;
			}
		    
			return true;
		};
		
	});
	
});