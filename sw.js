const CACHE_NAME = "random-select";

const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/ld.js",
  "/shuffle.png",
  "/about.html",
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(assets);
        })
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
        return res || fetch(e.request);
        })
    );
});