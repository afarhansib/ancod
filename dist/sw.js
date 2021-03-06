importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js'
)

workbox.core.setCacheNameDetails({ prefix: 'ancod-cache-v1' })

workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute([
  {
    "url": "AirbnbCereal-Bold.33d3a700.ttf",
    "revision": "c94c29feb80b02db176028d16fc634d2"
  },
  {
    "url": "AirbnbCereal-Book.b527bc4b.ttf",
    "revision": "86b15ac031e0507ad790afafd9adf7f7"
  },
  {
    "url": "icon-128x128.fa93d075.png",
    "revision": "2ccfc4078795ae5c9c2b65eaca8c257c"
  },
  {
    "url": "icon-144x144.2f3e4574.png",
    "revision": "e364e6bf63b05fa753a37634b5afb6ea"
  },
  {
    "url": "icon-152x152.cb8e38c3.png",
    "revision": "99237b1e2eea1a093260c3ce98a4855b"
  },
  {
    "url": "icon-192x192.8551fd83.png",
    "revision": "278543f0b8588bdf27efefc298718a11"
  },
  {
    "url": "icon-384x384.e0f981b7.png",
    "revision": "d95032f2caafd5b3d4e5e6d2a3e0aec4"
  },
  {
    "url": "icon-512x512.62fd022e.png",
    "revision": "de3235068c9c57f793d18150947fc47f"
  },
  {
    "url": "icon-72x72.dce55516.png",
    "revision": "2ac0520d2b2230713c58a30e6ae9ddbe"
  },
  {
    "url": "icon-96x96.3f333f57.png",
    "revision": "7dbb3f9decb769ef16ebe010e3d558dd"
  },
  {
    "url": "icon.png",
    "revision": "de3235068c9c57f793d18150947fc47f"
  },
  {
    "url": "index.html",
    "revision": "1ba1d45e43e1b7b092babcdbece73cc9"
  },
  {
    "url": "MaterialIcons-Regular.7f257eac.ttf",
    "revision": "a37b0c01c0baf1888ca812cc0508f6e2"
  },
  {
    "url": "src.4049cff9.js",
    "revision": "321f4c66b5dceaae7756962eed34e684"
  },
  {
    "url": "src.8de52465.css",
    "revision": "c27e84773ffb5d192fea070b4e5e192b"
  },
  {
    "url": "/",
    "revision": "1e15eeae7380093561dc9d52ec198f23"
  }
])

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