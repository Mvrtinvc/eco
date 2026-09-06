/* eco — service worker
   Sube la VERSION cada vez que cambies index.html, si no el celular
   sigue mostrando la versión vieja guardada en caché. */
const VERSION = "eco-v5";

const LOCALES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png"
];

// Instalación: guardar los archivos propios
self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(VERSION).then(function(cache){
      return cache.addAll(LOCALES);
    }).then(function(){ return self.skipWaiting(); })
  );
});

// Activación: borrar cachés de versiones anteriores
self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(nombres){
      return Promise.all(nombres.map(function(n){
        if(n !== VERSION){ return caches.delete(n); }
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

// Red primero para lo propio (así ves los cambios apenas hay señal),
// caché como respaldo cuando no hay internet.
self.addEventListener("fetch", function(e){
  const req = e.request;
  if(req.method !== "GET") return;

  const mismoOrigen = new URL(req.url).origin === self.location.origin;

  if(mismoOrigen){
    e.respondWith(
      fetch(req).then(function(res){
        const copia = res.clone();
        caches.open(VERSION).then(function(c){ c.put(req, copia); });
        return res;
      }).catch(function(){
        return caches.match(req).then(function(hit){
          return hit || caches.match("./index.html");
        });
      })
    );
    return;
  }

  // Recursos externos (tipografías, lector de ZIP): caché primero
  e.respondWith(
    caches.match(req).then(function(hit){
      if(hit) return hit;
      return fetch(req).then(function(res){
        const copia = res.clone();
        caches.open(VERSION).then(function(c){ c.put(req, copia); });
        return res;
      }).catch(function(){ return hit; });
    })
  );
});
