// Browser-side persistence for Active Hunt / Favorites, backed by dexie
// (IndexedDB). This is a static site with no backend — without this,
// everything (timers, notes, markers, favorites) is lost on every refresh.
//
// Key design decision: we do NOT store full monster objects (sprite import,
// mapImage import, spawns array, etc). Those come from the static data
// files (src/data/mvps.js / minibosses.js) and can change shape between
// app versions — serializing them would duplicate data and go stale. We
// only persist the volatile, user-generated bits:
//   - which monster IDs are in Active Hunt / Favorites, and their order
//   - per-monster: isFavorite, note
//   - per-spawn (keyed by map name, not array index — indexes shift if we
//     ever reorder/add spawns in the data file): killedAt, lastKillMarker
//
// On load, we look up each stored ID against the current ALL_MONSTERS list
// and rebuild the full live object by merging saved volatile data onto the
// fresh static data. If a monster was ever removed from the data files, its
// saved entry is silently skipped rather than crashing.

import Dexie from "dexie";
import ALL_MONSTERS from "../data/allMonsters";

const db = new Dexie("sovereignro-mvp-tracker");

db.version(1).stores({
    // Single-row key-value store: one row per named blob of state.
    // "activeHunt" -> array of persisted entries, "favorites" -> same.
    state: "key"
});

// v2 doesn't change the schema (still a single "key" keyed table) — it just
// gives us a place to also store a "preferences" row alongside "tracker" in
// the same table. Dexie requires a version bump even when .stores() is
// unchanged if we want migration hooks later, so this is here defensively;
// today it's a no-op upgrade.
db.version(2).stores({
    state: "key"
});

function findMonster(id) {
    return ALL_MONSTERS.find((m) => m.id === id);
}

// Strips a live monster object (which may carry runtime-only fields like
// isFavorite, note, and per-spawn killedAt/lastKillMarker) down to just the
// volatile bits worth saving.
function toPersistedEntry(mvp) {
    return {
        id: mvp.id,
        isFavorite: !!mvp.isFavorite,
        note: mvp.note || "",
        spawns: (mvp.spawns || []).map((spawn) => ({
            map: spawn.map,
            killedAt: spawn.killedAt || null,
            lastKillMarker: spawn.lastKillMarker || null
        }))
    };
}

// Rebuilds a live monster object from a persisted entry: start from the
// current static data (fresh sprite/mapImage/respawn info) and layer the
// saved volatile fields on top, matching spawns by map name.
function fromPersistedEntry(entry) {
    const base = findMonster(entry.id);
    if (!base) {
        // Monster no longer exists in the data files — drop it rather than
        // keep a broken half-object around.
        return null;
    }

    const savedSpawnsByMap = new Map(
        (entry.spawns || []).map((s) => [s.map, s])
    );

    const mergedSpawns = base.spawns.map((spawn) => {
        const saved = savedSpawnsByMap.get(spawn.map);
        if (!saved) {
            return spawn;
        }
        return {
            ...spawn,
            killedAt: saved.killedAt,
            lastKillMarker: saved.lastKillMarker
        };
    });

    return {
        ...base,
        isFavorite: entry.isFavorite,
        note: entry.note,
        spawns: mergedSpawns
    };
}

export async function saveState(activeHunt, favorites) {
    const payload = {
        activeHunt: activeHunt.map(toPersistedEntry),
        favorites: favorites.map(toPersistedEntry)
    };

    await db.state.put({ key: "tracker", value: payload });
}

// Returns { activeHunt: [...], favorites: [...] } rebuilt from storage, or
// null if there's nothing saved yet (first-ever visit).
export async function loadState() {
    const row = await db.state.get("tracker");
    if (!row) {
        return null;
    }

    const activeHunt = (row.value.activeHunt || [])
        .map(fromPersistedEntry)
        .filter(Boolean);

    const favorites = (row.value.favorites || [])
        .map(fromPersistedEntry)
        .filter(Boolean);

    return { activeHunt, favorites };
}

// --- JSON backup / restore ---
//
// Same persisted-entry shape as the IndexedDB store, wrapped with a version
// tag so a future format change can detect and migrate older backups
// instead of silently misreading them.

const BACKUP_FORMAT_VERSION = 1;

export function exportBackupJson(activeHunt, favorites) {
    const payload = {
        formatVersion: BACKUP_FORMAT_VERSION,
        exportedAt: new Date().toISOString(),
        activeHunt: activeHunt.map(toPersistedEntry),
        favorites: favorites.map(toPersistedEntry)
    };

    return JSON.stringify(payload, null, 2);
}

// Parses and rebuilds live state from an uploaded backup JSON string.
// Throws with a human-readable message on anything malformed, so the
// caller can show it to the user instead of a raw parser error.
export function importBackupJson(jsonText) {
    let parsed;
    try {
        parsed = JSON.parse(jsonText);
    } catch (err) {
        throw new Error("This file isn't valid JSON.");
    }

    if (!parsed || typeof parsed !== "object") {
        throw new Error("This file doesn't look like a SovereignRO backup.");
    }

    if (!Array.isArray(parsed.activeHunt) || !Array.isArray(parsed.favorites)) {
        throw new Error("This file doesn't look like a SovereignRO backup.");
    }

    const activeHunt = parsed.activeHunt.map(fromPersistedEntry).filter(Boolean);
    const favorites = parsed.favorites.map(fromPersistedEntry).filter(Boolean);

    return { activeHunt, favorites };
}

// --- Preferences (sound alarm, notifications, etc) ---
//
// Stored as a second row ("preferences") in the same key-value "state"
// table used for the tracker data. Kept separate from the JSON backup —
// preferences are a per-browser/per-device setting, not something you'd
// want to carry over when restoring someone else's (or your own past)
// tracker backup onto a new machine.

export const BUILTIN_SOUNDS = [
    { id: "chime", label: "Chime" },
    { id: "alarm", label: "Alarm" },
    { id: "ping", label: "Ping" }
];

const DEFAULT_PREFERENCES = {
    soundId: "chime",
    customSoundName: null,
    customSoundDataUrl: null,
    soundEnabled: true,
    notificationsEnabled: false,
    volume: 0.7
};

export async function loadPreferences() {
    const row = await db.state.get("preferences");
    if (!row) {
        return { ...DEFAULT_PREFERENCES };
    }
    return { ...DEFAULT_PREFERENCES, ...row.value };
}

export async function savePreferences(prefs) {
    await db.state.put({ key: "preferences", value: prefs });
}

// Wipes everything: tracker data (Active Hunt, Favorites, timers, notes,
// markers) AND preferences. Used by the Settings page's "reset to zero"
// button. Does not touch the data files, obviously — only what's in this
// browser's IndexedDB.
export async function clearAllData() {
    await db.state.clear();
}
