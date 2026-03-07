const CACHE_VERSION = "home-v3";
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const APP_SHELL_CACHE = `app-shell-${CACHE_VERSION}`;
const APP_SHELL = ["/", "/index.html"];

const isCacheableResponse = (response) =>
  response && (response.ok || response.type === "opaque");

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(APP_SHELL_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .catch(() => {
        // Do not block installation if one shell entry fails.
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => ![APP_SHELL_CACHE, RUNTIME_CACHE].includes(key))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

const staleWhileRevalidate = async (request) => {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then((response) => {
      if (isCacheableResponse(response)) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || networkPromise;
};

const networkFirstDocument = async (request) => {
  const cache = await caches.open(APP_SHELL_CACHE);
  try {
    const response = await fetch(request);
    if (isCacheableResponse(response)) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cachedDocument = await cache.match(request);
    if (cachedDocument) return cachedDocument;

    const fallbackShell = await cache.match("/");
    if (fallbackShell) return fallbackShell;

    throw new Error("No offline document available");
  }
};

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstDocument(request));
    return;
  }

  if (
    isSameOrigin &&
    (url.pathname.startsWith("/_build/") ||
      ["script", "style", "font", "image"].includes(request.destination))
  ) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  if (!isSameOrigin && ["style", "font", "image"].includes(request.destination)) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }
});
