var C="holycross-v58";
self.addEventListener("install",function(){self.skipWaiting()});
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  try{if(new URL(e.request.url).origin!==location.origin)return}catch(x){}
  e.respondWith(fetch(e.request).then(function(r){
    var c=r.clone();caches.open(C).then(function(ch){ch.put(e.request,c)});return r;
  }).catch(function(){return caches.match(e.request).then(function(m){return m||caches.match("./")})}));
});
