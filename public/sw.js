// Minimal service worker. This app has no backend and no offline data
// needs beyond what's already in IndexedDB, so this worker doesn't cache
// anything itself — its only job is to exist and be registered, which is
// one of the requirements browsers check before showing the "Install app"
// prompt (the other being the web app manifest, see manifest.webmanifest).
//
// Skip waiting / claim clients immediately so a new deployed version takes
// over right away instead of waiting for every tab to be closed first.
self.addEventListener("install", (event) => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

// No fetch handler: every request just falls through to the network as
// normal. If we ever want real offline support this is where a cache
// strategy would go.
