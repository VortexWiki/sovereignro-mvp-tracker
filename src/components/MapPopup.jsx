import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft } from "lucide-react";

import lastKillMarkerIcon from "../assets/icons/last-kill-marker.png";
import MonsterNameLink from "./MonsterNameLink";

// Popup for choosing which spawn map is active on a TimerCard, and for
// placing a last-kill marker on that map's image.
//
// Flow: Map button on a TimerCard -> if the mvp has more than one spawn,
// show a list to pick which map -> once a map is picked (or there was only
// one to begin with), show that map's image centered on screen -> clicking
// the image places the marker there and closes the popup.
//
// Rendered through a portal directly under <body>, so it's never nested
// inside a TimerCard's DOM subtree — avoids any interaction with the card's
// own hover/click handlers or stacking context.
//
// Closes only via Escape or the X button. There is no click-on-backdrop-to-
// close handler on purpose.
export default function MapPopup({ mvp, activeIndex, onSelectMap, onSetMarker, onClose }) {
    const hasMultipleSpawns = mvp.spawns.length > 1;
    const [view, setView] = useState(hasMultipleSpawns ? "list" : "map");

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const activeSpawn = mvp.spawns[activeIndex];

    function handlePickMap(index) {
        onSelectMap(index);
        setView("map");
    }

    function handleImageClick(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
        const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

        // Just place/move the marker — the popup stays open so the user can
        // click again to adjust it. They close it themselves via Esc or X.
        onSetMarker(activeIndex, xPercent, yPercent);
    }

    const popup = (

        <div className="map-popup-overlay">

            <div className="map-popup">

                <div className="map-popup-header">

                    {view === "map" && hasMultipleSpawns ? (

                        <button
                            type="button"
                            className="map-popup-back"
                            onClick={() => setView("list")}
                        >
                            <ChevronLeft size={18} />
                            <span>Change map</span>
                        </button>

                    ) : (

                        <h3 className="map-popup-title">
                            <MonsterNameLink mvp={mvp} />
                        </h3>

                    )}

                    <button
                        type="button"
                        className="map-popup-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>

                </div>

                {view === "list" && (

                    <div className="map-popup-list">

                        {mvp.spawns.map((spawn, index) => (

                            <button
                                type="button"
                                key={`${spawn.map}-${index}`}
                                className="map-popup-list-item"
                                onClick={() => handlePickMap(index)}
                            >

                                {spawn.mapImage ? (
                                    <img
                                        src={spawn.mapImage}
                                        alt={spawn.map}
                                        className="map-popup-list-thumb"
                                    />
                                ) : (
                                    <div className="map-popup-list-thumb map-popup-list-thumb--empty" />
                                )}

                                <div className="map-popup-list-info">

                                    <div className="map-popup-list-name">
                                        {spawn.map}
                                        {spawn.special && (
                                            <span className="map-popup-list-special"> · {spawn.special}</span>
                                        )}
                                    </div>

                                    <div className="map-popup-list-respawn">
                                        {spawn.respawnMin != null
                                            ? `⏱ ${spawn.respawnMin}~${spawn.respawnMax}m`
                                            : "⏱ Respawn unknown"}
                                    </div>

                                </div>

                            </button>

                        ))}

                    </div>

                )}

                {view === "map" && (

                    <div className="map-popup-image-wrap">

                        {activeSpawn.mapImage ? (

                            <div className="map-popup-image-frame" onClick={handleImageClick}>

                                <img
                                    src={activeSpawn.mapImage}
                                    alt={activeSpawn.map}
                                    className="map-popup-image"
                                />

                                {activeSpawn.lastKillMarker && (
                                    <img
                                        src={lastKillMarkerIcon}
                                        alt="Last kill location"
                                        className="map-popup-marker"
                                        style={{
                                            left: `${activeSpawn.lastKillMarker.x}%`,
                                            top: `${activeSpawn.lastKillMarker.y}%`
                                        }}
                                    />
                                )}

                            </div>

                        ) : (

                            <div className="map-popup-image-missing">
                                No map image available for this spawn.
                            </div>

                        )}

                        <p className="map-popup-hint">
                            Click the map to place or move the marker · Esc to close
                        </p>

                    </div>

                )}

            </div>

        </div>

    );

    return createPortal(popup, document.body);
}
