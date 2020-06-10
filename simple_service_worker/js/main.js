// check if sw is  supported by the browser
if('serviceWorker' in navigator) {
  //  register the sw when the window loads
  window.addEventListener('load',()=> {
    navigator.serviceWorker
    .register('../sw_cached_pages.js')
    .then(reg => console.log('Service Worker :Registered'))
    .catch(err => console.log(`Service Worker: Error: ${ err}`))
  })
}