import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import MonsterNameLink from "./MonsterNameLink";

// Renders specialCondition text, honoring a simple **bold** markup (easy to
// type in the source spreadsheet) — everything else is plain text, line
// breaks handled by the container's white-space: pre-wrap. Not a full
// markdown parser on purpose: this only ever needs bold spans.
function renderWithBold(text) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return part;
    });
}

// Popup for extra static info about a MVP that isn't a simple respawn
// timer — e.g. some MVPs only spawn after a kill-count threshold on their
// map, or the map itself has a special mechanic/effect. Content comes from
// the MVP's data entry (specialCondition field) — this popup is read-only,
// it doesn't let the user edit that. Same closing behavior as the other
// popups: Escape or the X button only.
export default function InfoPopup({ mvp, onClose }) {
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

    const specialCondition = mvp.specialCondition || "No special spawn condition yet.";

    const popup = (

        <div className="map-popup-overlay">

            <div className="map-popup info-popup">

                <div className="map-popup-header">

                    <h3 className="map-popup-title"><MonsterNameLink mvp={mvp} /> Info</h3>

                    <button
                        type="button"
                        className="map-popup-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>

                </div>

                <div className="info-popup-body">

                    {renderWithBold(specialCondition)}

                </div>

            </div>

        </div>

    );

    return createPortal(popup, document.body);
}
