const APP_CACHE = "version-1";
const cached_urls = ['index.html', 'offline.html', './assets/yt-icon.png']

const self = this;

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(APP_CACHE).then((cache) => {
            console.log('opened');
            return cache.addAll(cached_urls);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then(() => {
        console.log("Cached");
        return fetch(e.request).catch(() => caches.match("offline.html"));
    }));
});

self.addEventListener('activate', (e) => {
    const cached_withlist = [];
    cached_withlist.push(APP_CACHE);
    e.waitUntil(caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.map(cacheName => {
            if (!cached_withlist.includes(cacheName)) {
                return caches.delete(cacheName);
            }
        }));
    }));
});
