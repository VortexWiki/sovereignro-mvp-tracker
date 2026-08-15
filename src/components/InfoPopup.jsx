import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

// Popup for extra static info about a MVP that isn't a simple respawn
// timer — e.g. some MVPs only spawn after a kill-count threshold on their
// map, or the map itself has a special mechanic/effect. Two tabs: "Card
// Effect" and "Special Condition". Content comes from the MVP's data entry
// (cardEffect / specialCondition fields) — this popup is read-only, it
// doesn't let the user edit those. Same closing behavior as the other
// popups: Escape or the X button only.
export default function InfoPopup({ mvp, onClose }) {
    const [tab, setTab] = useState("cardEffect");

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

    const cardEffect = mvp.cardEffect || "No card effect info yet.";
    const specialCondition = mvp.specialCondition || "No special spawn condition yet.";

    const popup = (

        <div className="map-popup-overlay">

            <div className="map-popup info-popup">

                <div className="map-popup-header">

                    <h3 className="map-popup-title">{mvp.name} Info</h3>

                    <button
                        type="button"
                        className="map-popup-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>

                </div>

                <div className="info-popup-tabs">

                    <button
                        type="button"
                        className={`info-popup-tab${tab === "cardEffect" ? " info-popup-tab--active" : ""}`}
                        onClick={() => setTab("cardEffect")}
                    >
                        Card Effect
                    </button>

                    <button
                        type="button"
                        className={`info-popup-tab${tab === "specialCondition" ? " info-popup-tab--active" : ""}`}
                        onClick={() => setTab("specialCondition")}
                    >
                        Special Condition
                    </button>

                </div>

                <div className="info-popup-body">

                    {tab === "cardEffect" ? cardEffect : specialCondition}

                </div>

            </div>

        </div>

    );

    return createPortal(popup, document.body);
}
