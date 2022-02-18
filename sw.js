self.addEventListener('install', function (event) {
	// Instalar de inmediato
	if (self.skipWaiting) { self.skipWaiting(); }
	event.waitUntil(
		caches.open('cache01').then(function (cache) {
			return cache.addAll([
				'/',
				'index.html',
				'css/main.css',
				'img/ahorcado_arboles_fondo.webp',
				'img/ahorcado_arboles_frente_fondo.webp',
				'img/ahorcado_escenario_fondo.png',
				'img/ahorcado_fondo.jpg',
				'img/ajax.webp',
				'img/flama.webp',
				'img/humano.svg',
				'img/idalibre-logo.svg',
				'img/juan-palma-logo-obscuro.svg',
				'img/msnGano.webp',
				'img/msnPerdio.webp',
				'img/ovni.svg',
				'js/librerias/modernizr.js',
				'js/librerias/parallax.js',
				'js/librerias/require.js',
				'js/animaciones/estrellas.js',
				'js/owner/alertas.js',
				'js/owner/main.js',
				'js/owner/validaciones.js'
			]);
		})
	);
});
// Cache, falling back to network
self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});
// Elimina archivos de cache viejos
var cacheWhitelist = ['cache01'];
caches.keys().then(function (cacheNames) {
	return Promise.all(
		cacheNames.map(function (cacheName) {
			if (cacheWhitelist.indexOf(cacheName) === -1) {
				return caches.delete(cacheName);
			}
		})
	);
});
caches.keys().then(function (cacheKeys) {
	// Muestra en la consola la cache instalada 
	//console.log('Versión SW: ' + cacheKeys);
});