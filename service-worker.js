const CACHE_NAME = 'CONVO-CACHE-cdc4a9df-0e32-40ae-a2cb-d2219b2a717d';

const IMPERATIVE_CACHES = [
    `/convo/images/default-dp-white.svg`,
    `/convo/images/default-channel-white.svg`,
    `/convo/images/logo/logo-string.png`,
    `/convo/images/logo/logo-black.png`,
    `/convo/images/logo/logo.png`
];

/**
 * Caches all the required caches
 */
self.addEventListener('install', (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((openedCache) => {
      openedCache.addAll(IMPERATIVE_CACHES);
    })
  );
});


/**
 * Delete any old caches that are detected by having different cache name
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
    .then((keys) => {
      // Looks for outdated cach to delete
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
        .map((key) => caches.delete(key))
      );
    })
  );
});

/**
 * Fetch from cache if it exists in cache
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResolve) => {
      return cacheResolve || fetch(event.request);
    })
  )
})
