/* =========================================================
   CHHATH PUJA & DEVOTIONAL MEDIA - ULTRA-FAST SERVICE WORKER
   Zero-lag audio streaming cache & offline resilience
   ========================================================= */

const CACHE_NAME = "chhath-media-cache-v2";

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./hindi-songs.html",
  "./style.css",
  "./hindi-song.css",
  "./script.js",
  "./hindi-song.js",
  "./site.webmanifest",
  "./data/cloudinary/cloudinary_songs.json",
  "./data/youtube/youtube_songs.json",
  "./data/hindi_songs/hindi_songs.json",
  "./favicon.io/favicon-32x32.png",
  "./favicon.io/apple-touch-icon.png",
  "./favicon.io/android-chrome-192x192.png",
  "./favicon.io/android-chrome-512x512.png"
];

// Install Event - Pre-cache core assets
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn("[SW] Static asset pre-caching non-fatal error:", err);
      });
    })
  );
});

// Activate Event - Clean up stale caches and claim clients immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Smart Audio Range Caching & Fast Stale-While-Revalidate
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 1. Audio Streaming Requests (MP3s from Cloudinary / CDN / Local)
  if (
    url.pathname.endsWith(".mp3") ||
    req.destination === "audio" ||
    url.hostname.includes("res.cloudinary.com")
  ) {
    event.respondWith(handleAudioFetch(req));
    return;
  }

  // 2. JSON Song Data & Static Assets - Fast Cache-First with Background Update
  if (
    STATIC_ASSETS.some((asset) => req.url.includes(asset.replace("./", ""))) ||
    req.destination === "style" ||
    req.destination === "script" ||
    req.destination === "image" ||
    url.pathname.endsWith(".json")
  ) {
    event.respondWith(
      caches.match(req).then((cachedResponse) => {
        const fetchPromise = fetch(req).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return networkResponse;
        }).catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. Default Network-First for other navigation/API requests
  event.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});

/**
 * Handles Audio Fetch with Range-Request slicing and Cache support
 */
async function handleAudioFetch(req) {
  const cache = await caches.open(CACHE_NAME);
  
  // Clean URL without range query params for caching key
  const cleanUrl = req.url.split("?")[0];
  const cachedResponse = await cache.match(cleanUrl);

  const rangeHeader = req.headers.get("Range");

  if (cachedResponse) {
    if (!rangeHeader) {
      return cachedResponse;
    }

    // Synthesize partial content 206 response from cached blob for smooth scrubbing
    try {
      const blob = await cachedResponse.blob();
      const totalSize = blob.size;
      const rangeParts = rangeHeader.replace(/bytes=/, "").split("-");
      const start = parseInt(rangeParts[0], 10) || 0;
      const end = rangeParts[1] ? parseInt(rangeParts[1], 10) : totalSize - 1;

      if (start >= totalSize || end >= totalSize) {
        return new Response(null, {
          status: 416,
          headers: { "Content-Range": `bytes */${totalSize}` }
        });
      }

      const slicedBlob = blob.slice(start, end + 1);
      return new Response(slicedBlob, {
        status: 206,
        statusText: "Partial Content",
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Range": `bytes ${start}-${end}/${totalSize}`,
          "Content-Length": slicedBlob.size,
          "Accept-Ranges": "bytes",
          "Cache-Control": "public, max-age=31536000, immutable"
        }
      });
    } catch (e) {
      // If range synthesis fails, fall back to direct cached response
      return cachedResponse;
    }
  }

  // Not in cache: fetch from network and store full audio in background cache
  try {
    const networkResponse = await fetch(req);
    
    // In background, fetch full stream to cache for instant future playbacks
    if (networkResponse && (networkResponse.status === 200 || networkResponse.status === 206)) {
      fetch(cleanUrl, { mode: "cors" }).then((fullRes) => {
        if (fullRes.ok) {
          cache.put(cleanUrl, fullRes);
        }
      }).catch(() => {});
    }

    return networkResponse;
  } catch (err) {
    // If network fails and cached response is available
    if (cachedResponse) return cachedResponse;
    throw err;
  }
}
