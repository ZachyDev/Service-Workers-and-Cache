const cacheName = 'zachy';

const cacheAssets = [
    'index.html',
    'about.html',
    '/css/style.css',
    '/js/main.js'
];
//call install event
self.addEventListener('install',(e)=>{
    console.log('Service Worker: Installed');
    
    e.waitUntil(
        caches
                .open(cacheName)
                .then(cache => {
                    console.log('Service Worker:Caching files');
                    cache.addAll(cacheAssets);
                })
                .then(()=>self.skipWaiting())
    );
});
// call activate event
self.addEventListener('activate',(e)=>{
    console.log('Service Worker: Activated');
});