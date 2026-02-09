const CACHE_NAME = 'csharp-editor-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/editor.js',
  '/styles.css',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/editor/editor.main.css',
  'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/editor/editor.main.js',
  'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/base/worker/workerMain.js',
  'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/language/typescript/tsWorker.js'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch(err => {
        console.warn('Alguns recursos não puderam ser cacheados:', err);
        return cache.addAll(urlsToCache.filter(url => url.startsWith('/')));
      });
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Cache first, then network
self.addEventListener('fetch', (event) => {
  // Ignora requisições para chrome extensions e outros protocolos
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        // Não cachea respostas inválidas
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clona a resposta
        const responseToCache = response.clone();

        // Tenta cachear (ignora erros)
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache).catch(() => {
            // Silenciosamente ignora erros de cache
          });
        });

        return response;
      }).catch(() => {
        // Retorna offline page ou response em cache
        return caches.match(event.request) || 
               new Response('Offline - Sem conexão com internet', {
                 status: 503,
                 statusText: 'Service Unavailable',
                 headers: new Headers({
                   'Content-Type': 'text/plain'
                 })
               });
      });
    })
  );
});
