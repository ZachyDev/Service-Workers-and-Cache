const cacheName = 'v2';


//call install event
self.addEventListener('install',(e)=>{
    console.log('Service Worker: Installed');
});
// call activate event
self.addEventListener('activate',(e)=>{
    console.log('Service Worker: Activated');
    
    // remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing old cache');
                        caches.delete(cache);
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
            .then(res => {
                // Make  clone of the response
                const resClone = res.clone();
                caches
                    .open(cacheName)
                        .then(cache => {
                            // Add response to cache
                            cache.put(e.request,resClone)
                        });
                        return res;

            }).catch((err) => caches.match(e.request).then(res => res))
    )
})