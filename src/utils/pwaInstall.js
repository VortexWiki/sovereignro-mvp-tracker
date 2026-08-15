// Wraps the browser's beforeinstallprompt event so a plain button in
// Settings can trigger the native "Install app" dialog directly, instead
// of just telling the user to go dig for it in the browser's menu.
//
// How this works: Chrome/Edge fire "beforeinstallprompt" once the page
// qualifies for installation (manifest + service worker present, which we
// have — see public/manifest.webmanifest and public/sw.js). The browser
// won't show its own install UI automatically once we've called
// preventDefault() on that event, it just hands us the prompt() method to
// call whenever we want (e.g. from a button click). If the app is already
// installed, or the browser doesn't support installation at all (Firefox,
// Safari), the event never fires and installPrompt stays null forever —
// callers should treat "not available" as a real, expected state, not an
// error.

let deferredPrompt = null;
const listeners = new Set();

function notifyListeners() {
    listeners.forEach((fn) => fn(deferredPrompt !== null));
}

if (typeof window !== "undefined") {
    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        deferredPrompt = event;
        notifyListeners();
    });

    // Once installed, the prompt is no longer relevant — hide the button.
    window.addEventListener("appinstalled", () => {
        deferredPrompt = null;
        notifyListeners();
    });
}

export function isInstallPromptAvailable() {
    return deferredPrompt !== null;
}

// Subscribe to availability changes (the event can fire anytime after
// page load, well after Settings has already mounted). Returns an
// unsubscribe function.
export function onInstallAvailabilityChange(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
}

// Detects the standalone/installed state so we can tell the user "you're
// already using it as an app" instead of showing a button that does
// nothing useful.
export function isRunningStandalone() {
    if (typeof window === "undefined") {
        return false;
    }
    return (
        window.matchMedia?.("(display-mode: standalone)")?.matches ||
        window.navigator.standalone === true
    );
}

// Triggers the native install dialog. Returns the outcome
// ("accepted" | "dismissed") or null if no prompt was available.
export async function triggerInstallPrompt() {
    if (!deferredPrompt) {
        return null;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    // A prompt can only be used once — clear it either way.
    deferredPrompt = null;
    notifyListeners();
    return outcome;
}
