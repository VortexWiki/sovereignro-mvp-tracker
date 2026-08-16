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
//   - per-monster: isFavorite
//   - per-spawn (keyed by map name, not array index — indexes shift if we
//     ever reorder/add spawns in the data file): killedAt, lastKillMarker
//
// Notes are NOT part of this tracked-entry shape — see monsterExtras below.
// A note is written by monster ID regardless of whether that monster is
// currently in Active Hunt, Favorites, or neither (e.g. jotted down from the
// Monster List page on something you haven't started hunting yet), and it's
// the same note wherever it's shown. Storing it on the tracked-entry would
// mean it vanishes the moment a card is Stopped/removed, which defeats the
// purpose.
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
// isFavorite and per-spawn killedAt/lastKillMarker) down to just the
// volatile bits worth saving. Note is deliberately NOT included here — see
// monsterExtras below.
function toPersistedEntry(mvp) {
    return {
        id: mvp.id,
        isFavorite: !!mvp.isFavorite,
        spawns: (mvp.spawns || []).map((spawn) => ({
            map: spawn.map,
            killedAt: spawn.killedAt || null,
            lastKillMarker: spawn.lastKillMarker || null
        }))
    };
}

// Rebuilds a live monster object from a persisted entry: start from the
// current static data (fresh sprite/mapImage/respawn info) and layer the
// saved volatile fields on top, matching spawns by map name. `note` is
// merged in separately by the caller (from monsterExtras), since it isn't
// part of the persisted-entry shape.
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
// null if there's nothing saved yet (first-ever visit). Notes are merged in
// afterwards by the caller via applyMonsterNotes — this function only knows
// about the tracked-entry shape (isFavorite, timers, markers).
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

// --- Monster notes (independent of Active Hunt / Favorites tracking) ---
//
// A note lives on the monster ID itself, not on a tracked-entry — you can
// jot one down from the Monster List page on something you haven't added
// to Active Hunt or Favorites yet, and the same note shows up everywhere
// that monster appears (its TimerCard/FavoriteCard if you later track it,
// and the Monster List row either way). Stored as a single flat object
// { [monsterId]: "note text" } — only IDs with a non-empty note are kept,
// so this stays small over time instead of accumulating empty-string
// entries for every monster ever glanced at.

export async function loadMonsterNotes() {
    const row = await db.state.get("monsterNotes");
    return row ? row.value : {};
}

export async function saveMonsterNotes(notesById) {
    await db.state.put({ key: "monsterNotes", value: notesById });
}

// Merges saved notes onto a list of live monster objects (by id), for
// display. Always sets `note` explicitly (to the saved text, or "" if none)
// rather than only adding it when present — a monster object can already
// be carrying a stale `note` from an earlier merge (e.g. addMvp/addToFavorites
// copy whatever object Monster List handed them, which had already been run
// through applyMonsterNotes once). Without this, clearing a note wouldn't
// visibly clear the gold icon on an already-tracked card: the tracked
// entry's own stale `note` would keep winning since nothing here would ever
// overwrite it back to empty.
export function applyMonsterNotes(monsters, notesById) {
    const notes = notesById || {};
    return monsters.map((m) => ({ ...m, note: notes[m.id] || "" }));
}

// --- JSON backup / restore ---
//
// Same persisted-entry shape as the IndexedDB store, wrapped with a version
// tag so a future format change can detect and migrate older backups
// instead of silently misreading them.

// Bumped from 1 to 2 when monsterNotes was added as its own top-level field
// (previously notes lived inline on each tracked entry). Old backups
// (formatVersion 1 or missing) simply have no monsterNotes field — handled
// below by defaulting to {}, no explicit migration needed since the
// tracked-entry shape itself didn't change.
const BACKUP_FORMAT_VERSION = 2;

export function exportBackupJson(activeHunt, favorites, monsterNotes) {
    const payload = {
        formatVersion: BACKUP_FORMAT_VERSION,
        exportedAt: new Date().toISOString(),
        activeHunt: activeHunt.map(toPersistedEntry),
        favorites: favorites.map(toPersistedEntry),
        monsterNotes: monsterNotes || {}
    };

    return JSON.stringify(payload, null, 2);
}

// Parses and rebuilds live state from an uploaded backup JSON string.
// Throws with a human-readable message on anything malformed, so the
// caller can show it to the user instead of a raw parser error. Returns
// monsterNotes alongside activeHunt/favorites — older backups (v1, no notes
// field yet) just come back with an empty {} here.
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
    const monsterNotes = (parsed.monsterNotes && typeof parsed.monsterNotes === "object")
        ? parsed.monsterNotes
        : {};

    return { activeHunt, favorites, monsterNotes };
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
    { id: "ping", label: "Ping" },
    { id: "siren", label: "Siren" },
    { id: "klaxon", label: "Klaxon" },
    { id: "buzzer", label: "Buzzer" },
    { id: "bell", label: "Bell" },
    { id: "arcade", label: "Arcade beep" }
];

const DEFAULT_PREFERENCES = {
    soundId: "chime",
    soundEnabled: true,
    // Separate toggle: also play the alert sound on the later transition
    // into "spawned" (green), not just "spawn_window" (gold). Off by
    // default — the spawn_window alert is the one most people want.
    soundOnSpawnedEnabled: false,
    notificationsEnabled: false,
    volume: 0.7,
    // How many times the alarm sound plays back-to-back on Spawn Possible
    // (1 = just once, up to 5). Applies to both the default sound and any
    // per-MVP override sound below.
    soundRepeatCount: 1,
    // Per-MVP sound overrides: { [mvpId]: soundId }. When a MVP has an
    // entry here, its spawn alert plays this sound instead of the default
    // prefs.soundId. Kept alongside the other preferences (per-browser
    // setting) rather than in the tracker data, since it's about "how this
    // browser alerts me", not the monster itself.
    mvpSoundOverrides: {}
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
