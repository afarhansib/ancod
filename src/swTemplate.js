importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js'
)

workbox.core.setCacheNameDetails({ prefix: 'ancod-cache-v1' })

workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute([])

workbox.routing.registerNavigationRoute('index.html')

workbox.routing.registerRoute(
  new RegExp("https://corona.lmao.ninja/v2"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "api-cache",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
)

self.addEventListener('push', function(event) {
  let title = "Update Covid-19 Terbaru - Ancod";
  let body;

  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message tanpa payload';
  }

  let options = {
    body: body,
    badge: 'icon.png',
    icon: 'icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
})