// check of the sw is enables
if ('serviceWorker' in navigator) {
   
    window.addEventListener('load',() => {
        navigator.serviceWorker
            .register('../sw_cached_pages.js')
                .then(() => console.log('Service worker is registered'))
                .catch((err) => console.log(`Service worker: error: ${ err }`))
    })
}