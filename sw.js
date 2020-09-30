
const staticCacheName = 'site-static-v2';
const dynamicChache = 'site-danymic-v1'
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/salade.jpg',
  '/img/chicken.png',
  '/img/dinner.jpg',
  '/img/Hamburger.jpg',
  '/img/meat.png',
  '/img/pancakes.png',
  '/img/pizza.jpeg',
  'https://fonts.googleapis.com/icon?family=Material+Icons'];

self.addEventListener('install', evt => {
    //console.log('service worker installed');
    evt.waitUntil(
      caches.open(staticCacheName).then((cache) => {
        console.log('caching shell assets');
        cache.addAll(assets);
      })
    );
  });

// listener  Activated
self.addEventListener('activate', evt=>{
   // console.log('service worker has been activated ');

   evt.waitUntil(
       caches.keys().then(keys => {
        console.log(keys);
           return Promise.all(keys
            .filter(key => key !== staticCacheName)
            .map(key => caches.delete(key))
            )
       })
   );
});
// fetch event 

self.addEventListener('fetch', evet =>{
    // console.log('fetch event ', evet);
    evet.respondWith(
        caches.match(evet.request).then(cachesRes=>{
            return cachesRes || fetch(evet.request).then(
                fetchRes => {
                    return caches.open(dynamicChache).then(
                        cache => {
                            cache.put(evet.request.url, fetchRes.clone());
                            return fetchRes;
                        }
                    )
                }
            );
        })
    )
    
});