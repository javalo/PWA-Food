
self.addEventListener('install', evt => {
    console.log("service Worker has been installed ");
});

// listener is Activated
self.addEventListener('activate', evt=>{
    console.log('service worker has been activated ');
});
// fetch event 

self.addEventListener('fetch', evet =>{
    console.log('fetch event ', evet);
});