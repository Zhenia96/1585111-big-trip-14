const CACHE_VERSION = 'v14';
const CACHE_PREFIX = 'big-trip';
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VERSION}`;
const RESPONSE_SAFE_TYPE = 'basic';
const ERROR_MESSAGE = 'Failed request';

const handleFetch = (evt) => {
  const request = evt.request;

  evt.respondWith(
    caches.open(CACHE_NAME)
      .then((response) => {
        const cache = response;

        return fetch(request)
          .then((response) => {
            if (response.type !== RESPONSE_SAFE_TYPE) {
              return response;
            }

            if (!response || !response.ok) {
              throw new Error(ERROR_MESSAGE);
            }

            cache.put(request, response.clone());

            return response;
          })
          .catch(() => {
            return cache.match(request);
          });
      }),
  );
};

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        cache.addAll([
          '/',
          '/index.html',
          '/bundle.js',
          '/css/style.css',
          '/fonts/Montserrat-Bold.woff2',
          '/fonts/Montserrat-ExtraBold.woff2',
          '/fonts/Montserrat-Medium.woff2',
          '/fonts/Montserrat-Regular.woff2',
          '/fonts/Montserrat-SemiBold.woff2',
          '/img/icons/bus.png',
          '/img/icons/check-in.png',
          '/img/icons/drive.png',
          '/img/icons/flight.png',
          '/img/icons/restaurant.png',
          '/img/icons/ship.png',
          '/img/icons/sightseeing.png',
          '/img/icons/taxi.png',
          '/img/icons/train.png',
          '/img/icons/transport.png',
          '/img/header-bg.png',
          '/img/header-bg@2x.png',
          '/img/logo.png',
          '/sw.js',
        ]);
      }),
  );
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys()
      .then(
        (keys) => Promise.all(
          keys.map(
            (key) => {
              if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
                return caches.delete(key);
              }
              return null;
            })
            .filter((key) => key !== null),
        ),
      ),
  );
});

self.addEventListener('fetch', handleFetch);
