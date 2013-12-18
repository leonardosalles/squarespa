define(['square/services/services'], function (services) {
	'use strict';

	services.provider('$cookie', function () {

		this.$get = function ($notify, $config) {

			function addCookie(name, value, url, seconds) {
				var maxAge = '';
				if (seconds) {
					maxAge = ';max-age=' + seconds;
				}

				document.cookie = name + '=' + encodeURIComponent(value) + maxAge + ';';
			}

			function getCookie(name) {
				var nameEQ = name + '=';
				var ca = document.cookie.split(';');

				for (var i = 0, l = ca.length; i < l; i++) {
					var c = ca[i];

					while (c.charAt(0) === ' ') {
						c = c.substring(1, c.length);
					}

					if (c.indexOf(nameEQ) === 0) {
						try {
							return decodeURIComponent(c.substring(nameEQ.length, c.length));
						} catch (e) { return croak(e); }
					}
				}
			}

			function removeCookie(name, url) {
				addCookie(name, '', url, -1);
			}
			
			function addAuth(url, seconds) {
				addCookie('square-username', $config.appUsername, url, seconds || 60);
			}

			function croak(error) {
				$notify.error(error.title + ': ' + error.message);
				return false;
			}

			return {
				add: addCookie,
				get: getCookie,
				remove: removeCookie,
				auth: addAuth
			};
		};
	});
});