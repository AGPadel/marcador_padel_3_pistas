// Pádel Score · Service Worker
// Cache versionado — incrementar CACHE_NAME para forzar actualización

const CACHE_NAME = 'padel-score-v1';

const PRECACHE_ASSETS = [
  './index.html',
  './control.html',
  './videowall.html',
  './manifest.json'
];

// ─── INSTALL ──────────────────────────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// ─── ACTIVATE ─────────────────────────────────────────────────────────────────
// Elimina únicamente cachés propios obsoletos, sin tocar los de otras apps
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(k => k.startsWith('padel-score-') && k !== CACHE_NAME)
          .map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// ─── FETCH ────────────────────────────────────────────────────────────────────
// Estrategia: network-first para HTML, cache-first para el resto de assets
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Solo interceptar peticiones same-origin
  if (url.origin !== self.location.origin) return;

  const isHTML = event.request.destination === 'document' ||
                 url.pathname.endsWith('.html');

  if (isHTML) {
    // Network first: intenta red, si falla sirve caché
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // Cache first: sirve caché si existe, si no va a red
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
  }
});
