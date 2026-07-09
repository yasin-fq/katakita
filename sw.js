// Service Worker untuk Belajar Membaca - mendukung penggunaan offline
// Strategi: network-first untuk navigasi (cegah cache offline saat server hidup),
// cache-first untuk aset statis

const CACHE_VERSION = "v1.3.0";
const STATIC_CACHE = `baca-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `baca-runtime-${CACHE_VERSION}`;
const OFFLINE_URL = "offline.html";

// Daftar file inti yang di-cache saat instalasi (app shell)
const PRECACHE_URLS = [
  "./",
  "./offline.html",
  "./manifest.json",
  "./favicon.ico",
  "./favicon.svg",
  "./favicon.png",
  "./logo.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
];

// ===== INSTALL: pre-cache app shell =====
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) =>
        Promise.all(
          PRECACHE_URLS.map((url) =>
            cache.add(url).catch((err) => {
              console.warn("[SW] Gagal cache:", url, err);
            })
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

// ===== ACTIVATE: bersihkan cache lama =====
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => ![STATIC_CACHE, RUNTIME_CACHE].includes(key))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// ===== FETCH: strategi caching =====
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Hanya tangani permintaan GET
  if (request.method !== "GET") return;

  // Lewati permintaan non-http(s) (mis. chrome-extension)
  if (!url.protocol.startsWith("http")) return;

  // Untuk navigasi halaman: network-first dengan fallback cache, lalu offline
  // Hanya fallback ke offline jika network BENAR-BENAR gagal (bukan error HTTP)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Hanya cache response sukses (200)
          if (response.ok) {
            const copy = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          // Network gagal total (server down/offline) - coba cache
          const cached = await caches.match(request);
          if (cached) return cached;
          // Fallback terakhir: halaman offline
          const offline = await caches.match(OFFLINE_URL);
          if (offline) return offline;
          // Atau cached root
          return caches.match("/");
        })
    );
    return;
  }

  // Untuk aset statis (_next/static, gambar, font): cache-first
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icon") ||
    url.pathname.match(/\.(?:png|jpg|jpeg|svg|gif|webp|woff2?|ttf|css|js)$/)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request)
          .then((response) => {
            const copy = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
            return response;
          })
          .catch(() => cached);
      })
    );
    return;
  }

  // Default: stale-while-revalidate
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});

// ===== MESSAGE: kontrol dari halaman =====
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
