import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import MonsterNameLink from "./MonsterNameLink";

// Lets the user manually set the countdown's minutes-remaining instead of
// only being able to log a kill (Restart). Single field, nothing else
// changes. Same closing behavior as the other popups: Escape or the X
// button only.
export default function EditTimerPopup({ mvp, spawn, onSetMinutesRemaining, onClose }) {
    const [minutes, setMinutes] = useState("");

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

    function handleSave() {
        const parsed = parseFloat(minutes);
        if (Number.isNaN(parsed) || parsed < 0) {
            return;
        }
        onSetMinutesRemaining(parsed);
        onClose();
    }

    function handleKeyDownInput(e) {
        if (e.key === "Enter") {
            handleSave();
        }
    }

    const popup = (

        <div className="map-popup-overlay">

            <div className="map-popup edit-timer-popup">

                <div className="map-popup-header">

                    <h3 className="map-popup-title"><MonsterNameLink mvp={mvp} /> Timer</h3>

                    <button
                        type="button"
                        className="map-popup-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>

                </div>

                <div className="edit-timer-popup-body">

                    <label className="edit-timer-popup-label" htmlFor="edit-timer-minutes">
                        Minutes remaining ({spawn ? spawn.map : "Unknown"})
                    </label>

                    <input
                        id="edit-timer-minutes"
                        type="number"
                        min="0"
                        step="1"
                        className="edit-timer-popup-input"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        onKeyDown={handleKeyDownInput}
                        placeholder="e.g. 47"
                        autoFocus
                    />

                    <div className="edit-timer-popup-actions">

                        <button
                            type="button"
                            className="note-popup-save"
                            onClick={handleSave}
                        >
                            Save
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

    return createPortal(popup, document.body);
}
