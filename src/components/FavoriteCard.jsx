import { useDraggable } from "@dnd-kit/core";
import { Star } from "lucide-react";

import { getPrimarySpawn } from "../utils/maps";
import MonsterSprite from "./MonsterSprite";
import MonsterNameLink from "./MonsterNameLink";

// A compact card for a favorited monster — no active timer, just a
// bookmark. Click it (or drag it) into Active Hunt to start tracking it
// again. The 6px drag activation distance set on the PointerSensor means a
// plain click and a drag don't conflict with each other. The star button
// removes it from Favorites entirely (does not send it to Active Hunt) —
// stopPropagation keeps that click from also triggering onMoveToActiveHunt.
export default function FavoriteCard({ mvp, onMoveToActiveHunt, onRemoveFromFavorites }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `favorite-${mvp.id}`,
        data: { source: "favorites", mvp }
    });

    const spawn = getPrimarySpawn(mvp.spawns);

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              opacity: isDragging ? 0.5 : 1
          }
        : undefined;

    function handleRemoveClick(e) {
        e.stopPropagation();
        if (onRemoveFromFavorites) {
            onRemoveFromFavorites();
        }
    }

    // Also stop the pointerdown from reaching dnd-kit's drag listener on the
    // card, so pressing the star can never be mistaken for the start of a
    // drag even if the pointer drifts slightly before release.
    function handleRemovePointerDown(e) {
        e.stopPropagation();
    }

    // Same idea for the monster's name link: dnd-kit's drag listener on the
    // whole card starts on pointerdown, so without stopping it here a click
    // on the name would be swallowed as a drag attempt before the link's
    // own click (and MonsterNameLink's stopPropagation, which only guards
    // against the card's onClick) ever gets a chance to navigate.
    function handleNameLinkPointerDown(e) {
        e.stopPropagation();
    }

    return (

        <div
            ref={setNodeRef}
            style={style}
            className={`favorite-card${isDragging ? " favorite-card--dragging" : ""}`}
            onClick={onMoveToActiveHunt}
            {...listeners}
            {...attributes}
        >

            <MonsterSprite sprite={mvp.sprite} name={mvp.name} size={40} />

            <div className="favorite-card-info">

                <div onPointerDown={handleNameLinkPointerDown}>
                    <MonsterNameLink mvp={mvp} className="favorite-card-name" />
                </div>

                <div className="favorite-card-map">
                    {spawn ? spawn.map : "Unknown"}
                </div>

            </div>

            {/* Bottom-right corner, out of the name/map text's flow — a
                long monster name (e.g. "Gold Queen Scaraba") would
                otherwise butt right up against this button when it sat
                inline in the flex row. */}
            <button
                type="button"
                className="favorite-card-remove"
                onClick={handleRemoveClick}
                onPointerDown={handleRemovePointerDown}
                aria-label="Remove from favorites"
            >
                <Star size={16} fill="currentColor" />
            </button>

        </div>

    );
}
