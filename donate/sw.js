/* Donate Hub Service Worker (GitHub Pages)
   Scope: /donate/
*/
const CACHE_NAME = "donate-hub-v2025-12-06";
const CORE = [
  "/donate/",
  "/donate/index.html",
  "/donate/offline.html",
  "/donate/manifest.webmanifest",
  "/donate/favicon.svg",
  "/donate/sw.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CORE);
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k))));
    await self.clients.claim();
  })());
});

function isHTMLRequest(request) {
  return request.mode === "navigate" ||
    (request.headers.get("accept") || "").includes("text/html");
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only control same-origin /donate/ requests
  if (url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith("/donate/")) return;

  // Navigation: network-first, fallback to cache, fallback to offline
  if (isHTMLRequest(request)) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, fresh.clone());
        return fresh;
      } catch (_) {
        const cached = await caches.match(request);
        return cached || caches.match("/donate/offline.html");
      }
    })());
    return;
  }

  // Static assets: stale-while-revalidate
  event.respondWith((async () => {
    const cached = await caches.match(request);
    const fetchPromise = fetch(request).then((fresh) => {
      caches.open(CACHE_NAME).then((cache) => cache.put(request, fresh.clone()));
      return fresh;
    }).catch(() => cached);

    return cached || fetchPromise;
  })());
});
