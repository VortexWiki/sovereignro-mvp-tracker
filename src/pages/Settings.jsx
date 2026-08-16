import { useEffect, useState } from "react";
import { Bell, Play, Trash2, AlertTriangle, BellRing, Download, CheckCircle2, X } from "lucide-react";

import { BUILTIN_SOUNDS } from "../utils/persistence";
import { playSound, isNotificationSupported, getNotificationPermission, requestNotificationPermission } from "../utils/alarm";
import { isInstallPromptAvailable, onInstallAvailabilityChange, isRunningStandalone, triggerInstallPrompt } from "../utils/pwaInstall";
import ALL_MONSTERS from "../data/allMonsters";

// Settings page: choose the spawn_window alarm sound from a built-in bank,
// toggle sound/notifications, adjust volume, and a dangerous "reset
// everything" action that wipes IndexedDB. Preferences live in the same
// Dexie database as the tracker data (see utils/persistence.js) but are a
// separate key, since they're a per-browser setting rather than something
// you'd want bundled into a JSON backup you might restore on a different
// machine.
export default function Settings({ prefs, onUpdatePrefs, onResetEverything }) {
    const [notifPermission, setNotifPermission] = useState(getNotificationPermission());
    const [resetConfirming, setResetConfirming] = useState(false);
    const [resetDone, setResetDone] = useState(false);

    const [installAvailable, setInstallAvailable] = useState(isInstallPromptAvailable());
    const [installOutcome, setInstallOutcome] = useState(null);
    const alreadyInstalled = isRunningStandalone();

    // "Add a per-MVP sound" mini-form: which monster + which sound is
    // currently selected in the two dropdowns, before hitting Add.
    const [overrideMvpId, setOverrideMvpId] = useState("");
    const [overrideSoundId, setOverrideSoundId] = useState(BUILTIN_SOUNDS[0].id);

    const mvpSoundOverrides = prefs.mvpSoundOverrides || {};
    const sortedMonsters = [...ALL_MONSTERS].sort((a, b) => a.name.localeCompare(b.name));

    function findMonsterName(id) {
        const found = ALL_MONSTERS.find((m) => String(m.id) === String(id));
        return found ? found.name : `#${id}`;
    }

    function handleAddOverride() {
        if (!overrideMvpId) {
            return;
        }
        onUpdatePrefs({
            mvpSoundOverrides: { ...mvpSoundOverrides, [overrideMvpId]: overrideSoundId }
        });
        setOverrideMvpId("");
    }

    function handleRemoveOverride(mvpId) {
        const updated = { ...mvpSoundOverrides };
        delete updated[mvpId];
        onUpdatePrefs({ mvpSoundOverrides: updated });
    }

    useEffect(() => {
        // The beforeinstallprompt event can fire at any point after page
        // load (sometimes well after Settings has mounted), so this page
        // needs to react to it rather than only checking availability once
        // on mount.
        return onInstallAvailabilityChange(setInstallAvailable);
    }, []);

    async function handleInstallClick() {
        const outcome = await triggerInstallPrompt();
        setInstallOutcome(outcome);
    }

    function handleSelectBuiltin(soundId) {
        onUpdatePrefs({ soundId });
    }

    function handlePreview(soundId) {
        playSound({ ...prefs, soundId, soundEnabled: true });
    }

    async function handleEnableNotifications(checked) {
        if (!checked) {
            onUpdatePrefs({ notificationsEnabled: false });
            return;
        }

        if (!isNotificationSupported()) {
            return;
        }

        const permission = await requestNotificationPermission();
        setNotifPermission(permission);
        onUpdatePrefs({ notificationsEnabled: permission === "granted" });
    }

    function handleResetClick() {
        if (!resetConfirming) {
            setResetConfirming(true);
            return;
        }
        onResetEverything();
        setResetConfirming(false);
        setResetDone(true);
    }

    const notificationsBlocked = notifPermission === "denied";

    return (
        <main className="page">

            <div className="page-content">

                <div className="page-header">

                    <h1>Settings</h1>

                    <button className="icon-btn" aria-label="Notification settings" disabled>
                        <Bell size={19} />
                    </button>

                </div>

                <div className="backup-section">

                    <h2 className="backup-section-title">Spawn alert sound</h2>

                    <p className="backup-section-text">
                        Plays once when an MVP or mini-boss becomes Spawn
                        Possible. Pick a sound below.
                    </p>

                    <div className="settings-toggle-grid">

                        <label className="settings-toggle-row">
                            <input
                                type="checkbox"
                                checked={prefs.soundEnabled}
                                onChange={(e) => onUpdatePrefs({ soundEnabled: e.target.checked })}
                            />
                            <span>Play a sound on Spawn Possible</span>
                        </label>

                        <label className="settings-toggle-row">
                            <input
                                type="checkbox"
                                checked={prefs.soundOnSpawnedEnabled}
                                onChange={(e) => onUpdatePrefs({ soundOnSpawnedEnabled: e.target.checked })}
                            />
                            <span>Also play a sound on Spawned</span>
                        </label>

                    </div>

                    <div className="settings-sound-list">

                        {BUILTIN_SOUNDS.map((sound) => (

                            <div
                                key={sound.id}
                                className={`settings-sound-option${prefs.soundId === sound.id ? " settings-sound-option--active" : ""}`}
                            >

                                <label className="settings-sound-label">
                                    <input
                                        type="radio"
                                        name="alarm-sound"
                                        checked={prefs.soundId === sound.id}
                                        onChange={() => handleSelectBuiltin(sound.id)}
                                    />
                                    <span>{sound.label}</span>
                                </label>

                                <button
                                    type="button"
                                    className="settings-sound-preview"
                                    onClick={() => handlePreview(sound.id)}
                                    aria-label={`Preview ${sound.label}`}
                                    data-tooltip="Preview"
                                >
                                    <Play size={14} />
                                </button>

                            </div>

                        ))}

                    </div>

                    <div className="settings-volume-row">
                        <span>Volume</span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={prefs.volume}
                            onChange={(e) => onUpdatePrefs({ volume: parseFloat(e.target.value) })}
                        />
                    </div>

                    <div className="settings-volume-row">
                        <span>Repeat</span>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            value={prefs.soundRepeatCount || 1}
                            onChange={(e) => onUpdatePrefs({ soundRepeatCount: parseInt(e.target.value, 10) })}
                        />
                        <span>{prefs.soundRepeatCount || 1}x</span>
                    </div>

                </div>

                <div className="backup-section">

                    <h2 className="backup-section-title">Per-MVP sound</h2>

                    <p className="backup-section-text">
                        Give a specific MVP or mini-boss its own alert sound,
                        overriding the default sound above just for that one.
                    </p>

                    <div className="settings-override-row">

                        <select
                            className="settings-override-select"
                            value={overrideMvpId}
                            onChange={(e) => setOverrideMvpId(e.target.value)}
                        >
                            <option value="">Choose a monster...</option>
                            {sortedMonsters.map((m) => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                        </select>

                        <select
                            className="settings-override-select"
                            value={overrideSoundId}
                            onChange={(e) => setOverrideSoundId(e.target.value)}
                        >
                            {BUILTIN_SOUNDS.map((sound) => (
                                <option key={sound.id} value={sound.id}>{sound.label}</option>
                            ))}
                        </select>

                        <button
                            type="button"
                            className="backup-action"
                            onClick={handleAddOverride}
                            disabled={!overrideMvpId}
                        >
                            Add
                        </button>

                    </div>

                    {Object.keys(mvpSoundOverrides).length > 0 && (

                        <div className="settings-override-list">

                            {Object.entries(mvpSoundOverrides).map(([mvpId, soundId]) => (

                                <div key={mvpId} className="settings-override-item">

                                    <span className="settings-override-item-name">{findMonsterName(mvpId)}</span>

                                    <span className="settings-override-item-sound">
                                        {BUILTIN_SOUNDS.find((s) => s.id === soundId)?.label || soundId}
                                    </span>

                                    <button
                                        type="button"
                                        className="settings-sound-preview"
                                        onClick={() => handlePreview(soundId)}
                                        aria-label="Preview"
                                        data-tooltip="Preview"
                                    >
                                        <Play size={14} />
                                    </button>

                                    <button
                                        type="button"
                                        className="settings-override-remove"
                                        onClick={() => handleRemoveOverride(mvpId)}
                                        aria-label="Remove override"
                                        data-tooltip="Remove"
                                    >
                                        <X size={14} />
                                    </button>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

                <div className="backup-section">

                    <h2 className="backup-section-title">Windows notifications</h2>

                    <p className="backup-section-text">
                        Also show a desktop notification on Spawn Possible,
                        useful if the tracker is in a background tab.
                        {!isNotificationSupported() && " Not supported in this browser."}
                    </p>

                    <label className="settings-toggle-row">
                        <input
                            type="checkbox"
                            checked={prefs.notificationsEnabled}
                            disabled={!isNotificationSupported() || notificationsBlocked}
                            onChange={(e) => handleEnableNotifications(e.target.checked)}
                        />
                        <span>Enable desktop notifications</span>
                    </label>

                    {notificationsBlocked && (
                        <p className="backup-message backup-message--error">
                            <AlertTriangle size={15} />
                            <span>Notifications are blocked for this site in your browser settings.</span>
                        </p>
                    )}

                    {!isNotificationSupported() && (
                        <p className="backup-message backup-message--error">
                            <AlertTriangle size={15} />
                            <span>This browser or connection doesn't support desktop notifications (needs a secure context: https or localhost).</span>
                        </p>
                    )}

                    <div className="settings-pwa-hint">

                        <BellRing size={14} />

                        <span>
                            {" "}For the most reliable Windows toast notifications, install
                            this tracker as an app.
                        </span>

                    </div>

                    {alreadyInstalled ? (

                        <p className="backup-message backup-message--success">
                            <CheckCircle2 size={15} />
                            <span>Already installed as an app.</span>
                        </p>

                    ) : installAvailable ? (

                        <button type="button" className="backup-action backup-action--primary" onClick={handleInstallClick}>
                            <Download size={16} />
                            <span>Install SovereignRO MVP Tracker</span>
                        </button>

                    ) : (

                        <p className="backup-section-text">
                            Your browser hasn't offered an install prompt yet.
                            Some browsers only allow this after you've
                            visited the site a couple of times, or you can
                            look for an install icon in the address bar.
                        </p>

                    )}

                    {installOutcome === "dismissed" && (
                        <p className="backup-section-text">Install was dismissed, you can try again anytime.</p>
                    )}

                </div>

                <div className="backup-section settings-danger-section">

                    <h2 className="backup-section-title">Reset everything</h2>

                    <p className="backup-section-text">
                        Clears Active Hunt, Favorites, notes, timers, and
                        these preferences in this browser. This can't be
                        undone, export a backup first if you want to keep a
                        copy.
                    </p>

                    <button
                        type="button"
                        className={`backup-action settings-danger-action${resetConfirming ? " settings-danger-action--confirming" : ""}`}
                        onClick={handleResetClick}
                    >
                        <Trash2 size={16} />
                        <span>{resetConfirming ? "Click again to confirm" : "Clear all data (reset to 0)"}</span>
                    </button>

                    {resetDone && (
                        <p className="backup-message backup-message--success">Everything's been reset.</p>
                    )}

                </div>

            </div>

        </main>
    );
}
