// Sound + browser notification helpers for the "Spawn Possible" alert.
//
// Sounds: a small built-in bank (bundled as real assets, imported below so
// Vite fingerprints/bundles them properly) plus support for a user-uploaded
// custom sound stored as a data URL in preferences (so it survives reload
// without needing a separate file-storage layer).

import chimeSound from "../assets/sounds/chime.mp3";
import alarmSound from "../assets/sounds/alarm.mp3";
import pingSound from "../assets/sounds/ping.mp3";

const BUILTIN_SOUND_FILES = {
    chime: chimeSound,
    alarm: alarmSound,
    ping: pingSound
};

export function getSoundUrl(prefs) {
    if (prefs.soundId === "custom" && prefs.customSoundDataUrl) {
        return prefs.customSoundDataUrl;
    }
    return BUILTIN_SOUND_FILES[prefs.soundId] || BUILTIN_SOUND_FILES.chime;
}

// Plays a preview or the real alert sound. Returns the Audio element in
// case the caller wants to stop() it early (not currently used, but handy
// for a "stop preview" button later).
export function playSound(prefs) {
    if (!prefs.soundEnabled) {
        return null;
    }
    try {
        const audio = new Audio(getSoundUrl(prefs));
        audio.volume = prefs.volume != null ? prefs.volume : 0.7;
        audio.play().catch(() => {
            // Autoplay can be blocked before the user has interacted with
            // the page at all — nothing useful to do here besides not
            // crashing the app over it.
        });
        return audio;
    } catch (err) {
        return null;
    }
}

export function isNotificationSupported() {
    return typeof window !== "undefined" && "Notification" in window;
}

export function getNotificationPermission() {
    if (!isNotificationSupported()) {
        return "unsupported";
    }
    return Notification.permission;
}

export async function requestNotificationPermission() {
    if (!isNotificationSupported()) {
        return "unsupported";
    }
    return Notification.requestPermission();
}

// Fires a Windows/OS-level toast notification if the user opted in and
// permission is granted. Silently does nothing otherwise (the in-app glow
// + sound already cover that case).
export function notifySpawnPossible(mvpName, mapName, prefs) {
    if (!prefs.notificationsEnabled) {
        return;
    }
    if (!isNotificationSupported() || Notification.permission !== "granted") {
        return;
    }
    try {
        new Notification("Spawn Possible", {
            body: `${mvpName} can now spawn (${mapName}).`,
            tag: `spawn-${mvpName}`
        });
    } catch (err) {
        // Some environments (e.g. no active service worker yet on first
        // load) can throw here — not worth surfacing to the user.
    }
}

// Called once per genuine transition into "spawn_window" for a given card.
// Plays the configured sound and raises a notification.
export function triggerSpawnAlert(mvpName, mapName, prefs) {
    playSound(prefs);
    notifySpawnPossible(mvpName, mapName, prefs);
}
