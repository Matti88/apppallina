const CACHE_NAME = 'ball-game-v1';
const assetsToCache = [
    '/',
    '/index.html',
    '/script.js',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(assetsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request).catch(() => {
                    // If both cache and network fail, return a simple offline page or fallback
                    return new Response('Offline - Unable to fetch resource', {
                        status: 503,
                        statusText: 'Service Unavailable'
                    });
                });
            })
    );
});