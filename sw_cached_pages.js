const cacheName = 'zac';
const cacheAssets = [
    'index.html',
    'about.html',
    '/css/style.css',
    '/js/main.js'
];


// trigger the install event
self.addEventListener('install',(e) => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches
            .open(cacheName)
                .then(cache => {
                    console.log('Sw: Caching files...')
                    cache.addAll(cacheAssets)
                })
                .then(() => self.skipWaiting())
    )
})

// trigger the activate event
self.addEventListener('activate',(e) => {
    console.log('Service Worker: Activated');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Sw: Deleting old caches');
                        caches.delete(cache)
                    }
                })
            )
        })
    )
});

// call fetch event
self.addEventListener('fetch',e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
            .catch(() => caches.match(e.request))
    )
})