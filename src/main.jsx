import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/global.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// Registering the service worker is one of the two requirements browsers
// check before offering "Install app" (the other being the manifest linked
// in index.html). See public/sw.js — it doesn't cache anything today, it
// just needs to exist and be active.
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {
            // Not fatal — the app still works fine without it, it just
            // won't be installable as a PWA.
        });
    });
}