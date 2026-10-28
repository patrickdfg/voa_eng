/* 하루영어 PWA - 앱 화면에 필요한 파일만 오프라인 보관합니다.
   VOA 영상 및 외부 PDF는 캐시하지 않습니다. */
const CACHE_NAME = "haru-english-shell-v20261029-1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./data.js?v=20261029",
  "./practice-data.js?v=20261029",
  "./app.js?v=20261029",
  "./styles.css?v=20261029-pwa",
  "./pwa.js?v=20261029-pwa",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(
        names.filter(name => name.startsWith("haru-english-shell-") && name !== CACHE_NAME)
          .map(name => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const scope = new URL(self.registration.scope);
  if (url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(async response => {
          if (response.ok && response.type === "basic") {
            const copy = response.clone();
            try {
              const cache = await caches.open(CACHE_NAME);
              await cache.put(new URL("./index.html", scope).href, copy);
            } catch (_) { /* 저장 공간 오류여도 온라인 페이지는 표시합니다. */ }
          }
          return response;
        })
        .catch(async () => (await caches.match(new URL("./index.html", scope).href)) ||
          Response.error())
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(async response => {
      if (response.ok && response.type === "basic") {
        const copy = response.clone();
        try {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, copy);
        } catch (_) { /* 저장 공간 오류여도 온라인 파일은 표시합니다. */ }
      }
      return response;
    }))
  );
});
