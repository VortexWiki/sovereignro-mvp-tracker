import { useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    RotateCcw,
    Map,
    Star,
    Square,
    StickyNote,
    Info,
    Pencil
} from "lucide-react";

import { getPrimarySpawn } from "../utils/maps";
import { getTimerStatus, getSecondsRemaining, formatClock, setMinutesRemaining, TIMER_STATUS_LABEL } from "../utils/timer";
import { triggerSpawnAlert } from "../utils/alarm";
import MonsterSprite from "./MonsterSprite";
import MonsterNameLink from "./MonsterNameLink";
import MapPopup from "./MapPopup";
import NotePopup from "./NotePopup";
import InfoPopup from "./InfoPopup";
import EditTimerPopup from "./EditTimerPopup";

import mvpBadge from "../assets/icons/mvp-badge.png";
import minibossBadge from "../assets/icons/miniboss-badge.png";

export default function TimerCard({ mvp, onUpdateMvp, onStop, onToggleFavorite, alarmPrefs }) {

    // The star button toggles isFavorite. Turning it on moves the card to
    // Favorites immediately (there's no "starred but still in Active Hunt"
    // state on entry). Turning it back off (clicking the already-gold star)
    // just clears the flag and the card stays put in Active Hunt — a later
    // Stop will then drop it entirely instead of sending it back to
    // Favorites.

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: mvp.id,
        data: { source: "active-hunt", mvp }
    });

    const dragStyle = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    };

    const [mapPopupOpen, setMapPopupOpen] = useState(false);
    const [notePopupOpen, setNotePopupOpen] = useState(false);
    const [infoPopupOpen, setInfoPopupOpen] = useState(false);
    const [editTimerPopupOpen, setEditTimerPopupOpen] = useState(false);

    // Which spawn (map) is currently displayed on this card. Defaults to the
    // same "best" spawn getPrimarySpawn would pick, but the user can switch
    // via the map popup — each TimerCard instance remembers its own choice.
    // Every spawn keeps its own independent timer (spawn.killedAt), so
    // switching which one is shown never resets another map's countdown.
    const defaultSpawn = getPrimarySpawn(mvp.spawns);
    const defaultIndex = mvp.spawns.indexOf(defaultSpawn);
    const [activeSpawnIndex, setActiveSpawnIndex] = useState(defaultIndex === -1 ? 0 : defaultIndex);

    // Re-render once a second so the countdown clock stays live. This is a
    // cheap tick — it only forces a re-read of Date.now(), no state is
    // actually stored here.
    const [, forceTick] = useState(0);

    useEffect(() => {
        const id = setInterval(() => forceTick((n) => n + 1), 1000);
        return () => clearInterval(id);
    }, []);

    const spawn = mvp.spawns[activeSpawnIndex];
    const extraSpawnCount = mvp.spawns ? mvp.spawns.length - 1 : 0;

    const now = Date.now();
    const status = getTimerStatus(spawn, now);
    const secondsRemaining = getSecondsRemaining(spawn, now);
    const hasRespawnData = spawn && spawn.respawnMin != null && spawn.respawnMax != null;

    // Fire the alarm exactly once per transition INTO spawn_window, not on
    // every 1s tick. We keep the previous status in a ref (not state, so
    // comparing it never itself causes a re-render) and only alert on the
    // rising edge — entering spawn_window from anything else.
    const previousStatusRef = useRef(status);

    useEffect(() => {
        const previousStatus = previousStatusRef.current;
        if (previousStatus !== "spawn_window" && status === "spawn_window" && alarmPrefs) {
            triggerSpawnAlert(mvp.name, spawn ? spawn.map : "Unknown", alarmPrefs);
        }
        previousStatusRef.current = status;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    function updateActiveSpawn(changes) {
        if (!onUpdateMvp) {
            return;
        }

        const updatedSpawns = mvp.spawns.map((s, i) =>
            i === activeSpawnIndex ? { ...s, ...changes } : s
        );

        onUpdateMvp({ ...mvp, spawns: updatedSpawns });
    }

    function handleRestartTimer() {
        updateActiveSpawn({ killedAt: Date.now() });
    }

    // Manual override: the user types how many minutes remain rather than
    // logging an actual kill. Back-solves killedAt so the rest of the timer
    // logic (status, countdown, spawn_window alarm) keeps working unchanged.
    function handleSetMinutesRemaining(minutesRemaining) {
        const newKilledAt = setMinutesRemaining(spawn, minutesRemaining, Date.now());
        updateActiveSpawn({ killedAt: newKilledAt });
    }

    function handleStopTimer() {
        // Reset this card's timer, then let the parent decide where the
        // card goes: back to Favorites if it's flagged as a favorite, or
        // dropped entirely if not.
        updateActiveSpawn({ killedAt: null });

        if (onStop) {
            onStop();
        }
    }

    function handleSelectMap(index) {
        setActiveSpawnIndex(index);
    }

    function handleSetMarker(spawnIndex, x, y) {
        if (!onUpdateMvp) {
            return;
        }

        const updatedSpawns = mvp.spawns.map((s, i) =>
            i === spawnIndex ? { ...s, lastKillMarker: { x, y } } : s
        );

        onUpdateMvp({ ...mvp, spawns: updatedSpawns });
    }

    // Note is per-MVP, not per-spawn — it travels with the card no matter
    // which map is currently displayed.
    function handleSaveNote(text) {
        if (!onUpdateMvp) {
            return;
        }

        onUpdateMvp({ ...mvp, note: text });
    }

    return (

        <div
            ref={setNodeRef}
            style={dragStyle}
            className={`timer-card${isDragging ? " timer-card--dragging" : ""}${status === "spawn_window" ? " timer-card--spawn-window" : ""}`}
        >

            {mvp.category === "miniboss" ? (
                <img
                    src={minibossBadge}
                    alt="Mini-boss"
                    className="timer-card-badge timer-card-badge--miniboss"
                />
            ) : (
                <img
                    src={mvpBadge}
                    alt="MVP"
                    className="timer-card-badge"
                />
            )}

            <div className="timer-card-drag-handle" {...attributes} {...listeners}>

                <div className="timer-card-sprite-wrap">

                    <MonsterSprite sprite={mvp.sprite} name={mvp.name} size={68} />

                </div>

            </div>

            <h3 className="timer-card-name">
                {/* Outside the drag handle: dnd-kit's pointer-down listener
                    on the handle would otherwise intercept the click before
                    the link's own click handler (and even navigation) can
                    fire, since a drag activation starts on pointerdown, not
                    on the completed click. */}
                <MonsterNameLink mvp={mvp} />
            </h3>

            <p className={`timer-card-status timer-card-status--${status}`}>
                {TIMER_STATUS_LABEL[status]}
            </p>

            <p className="timer-card-clock">
                {formatClock(secondsRemaining)}
            </p>

            <p className="timer-card-map">
                📍 {spawn ? spawn.map : "Unknown"}
                {extraSpawnCount > 0 && (
                    <span className="timer-card-map-extra"> +{extraSpawnCount}</span>
                )}
            </p>

            <p className="timer-card-respawn">
                {hasRespawnData
                    ? `⏱ ${spawn.respawnMin}~${spawn.respawnMax}m`
                    : "⏱ Respawn unknown"}
            </p>

            <div className="timer-card-actions">

                <button
                    type="button"
                    className="timer-card-action"
                    onClick={handleRestartTimer}
                    disabled={!hasRespawnData}
                    aria-label="Restart timer"
                    data-tooltip="Restart timer"
                >
                    <RotateCcw size={18} />
                </button>

                <button
                    type="button"
                    className="timer-card-action"
                    onClick={() => setMapPopupOpen(true)}
                    aria-label="Choose last kill map"
                    data-tooltip="Choose last kill map"
                >
                    <Map size={18} />
                </button>

                <button
                    type="button"
                    className="timer-card-action"
                    onClick={() => setEditTimerPopupOpen(true)}
                    disabled={!hasRespawnData}
                    aria-label="Edit timer"
                    data-tooltip="Edit timer"
                >
                    <Pencil size={18} />
                </button>

                <button
                    type="button"
                    className={`timer-card-action${mvp.isFavorite ? " timer-card-action--favorite" : ""}`}
                    onClick={onToggleFavorite}
                    aria-label={mvp.isFavorite ? "Remove from favorites" : "Move to favorites"}
                    data-tooltip={mvp.isFavorite ? "Remove from favorites" : "Move to favorites"}
                >
                    <Star size={18} fill={mvp.isFavorite ? "currentColor" : "none"} />
                </button>

                <button
                    type="button"
                    className="timer-card-action"
                    onClick={handleStopTimer}
                    aria-label="Stop timer"
                    data-tooltip="Stop timer"
                >
                    <Square size={18} />
                </button>

                <button
                    type="button"
                    className={`timer-card-action${mvp.note ? " timer-card-action--favorite" : ""}`}
                    onClick={() => setNotePopupOpen(true)}
                    aria-label="Note"
                    data-tooltip={mvp.note ? "Edit note" : "Add note"}
                >
                    <StickyNote size={18} fill={mvp.note ? "currentColor" : "none"} />
                </button>

                <button
                    type="button"
                    className="timer-card-action"
                    onClick={() => setInfoPopupOpen(true)}
                    aria-label="More info"
                    data-tooltip="More info"
                >
                    <Info size={18} />
                </button>

            </div>

            {mapPopupOpen && (

                <MapPopup
                    mvp={mvp}
                    activeIndex={activeSpawnIndex}
                    onSelectMap={handleSelectMap}
                    onSetMarker={handleSetMarker}
                    onClose={() => setMapPopupOpen(false)}
                />

            )}

            {notePopupOpen && (

                <NotePopup
                    mvp={mvp}
                    onSaveNote={handleSaveNote}
                    onClose={() => setNotePopupOpen(false)}
                />

            )}

            {infoPopupOpen && (

                <InfoPopup
                    mvp={mvp}
                    onClose={() => setInfoPopupOpen(false)}
                />

            )}

            {editTimerPopupOpen && (

                <EditTimerPopup
                    mvp={mvp}
                    spawn={spawn}
                    onSetMinutesRemaining={handleSetMinutesRemaining}
                    onClose={() => setEditTimerPopupOpen(false)}
                />

            )}

        </div>

    );

}
