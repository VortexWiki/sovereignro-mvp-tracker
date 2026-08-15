// Sound + browser notification helpers for the "Spawn Possible" alert.
//
// Sounds: a built-in bank only (bundled as real assets, imported below so
// Vite fingerprints/bundles them properly). No custom upload support —
// keeping this to a curated bank avoids the format-compatibility issues
// a user-provided file can run into (e.g. MIDI not playing through the
// Audio element in most browsers).

import chimeSound from "../assets/sounds/chime.mp3";
import alarmSound from "../assets/sounds/alarm.mp3";
import pingSound from "../assets/sounds/ping.mp3";
import sirenSound from "../assets/sounds/siren.mp3";
import klaxonSound from "../assets/sounds/klaxon.mp3";
import buzzerSound from "../assets/sounds/buzzer.mp3";
import bellSound from "../assets/sounds/bell.mp3";
import arcadeSound from "../assets/sounds/arcade.mp3";

const BUILTIN_SOUND_FILES = {
    chime: chimeSound,
    alarm: alarmSound,
    ping: pingSound,
    siren: sirenSound,
    klaxon: klaxonSound,
    buzzer: buzzerSound,
    bell: bellSound,
    arcade: arcadeSound
};

export function getSoundUrl(prefs) {
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
