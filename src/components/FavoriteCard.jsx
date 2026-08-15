import { useDraggable } from "@dnd-kit/core";
import { Star } from "lucide-react";

import { getPrimarySpawn } from "../utils/maps";
import MonsterSprite from "./MonsterSprite";

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

                <div className="favorite-card-name">{mvp.name}</div>

                <div className="favorite-card-map">
                    {spawn ? spawn.map : "Unknown"}
                </div>

            </div>

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
