import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import MonsterNameLink from "./MonsterNameLink";

// Popup for writing a free-form note on a MVP. One note per MVP (not per
// spawn/map) — it travels with the card regardless of which map is
// currently displayed. Same closing behavior as MapPopup: Escape or the X
// button only, no click-on-backdrop-to-close, rendered through a portal so
// it's never nested inside the TimerCard's own DOM subtree.
export default function NotePopup({ mvp, onSaveNote, onClose }) {
    const [text, setText] = useState(mvp.note || "");

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
        onSaveNote(text);
        onClose();
    }

    const popup = (

        <div className="map-popup-overlay">

            <div className="map-popup note-popup">

                <div className="map-popup-header">

                    <h3 className="map-popup-title"><MonsterNameLink mvp={mvp} /> Note</h3>

                    <button
                        type="button"
                        className="map-popup-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>

                </div>

                <div className="note-popup-body">

                    <textarea
                        className="note-popup-textarea"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write a note about this MVP…"
                        rows={6}
                        autoFocus
                    />

                    <div className="note-popup-actions">

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
