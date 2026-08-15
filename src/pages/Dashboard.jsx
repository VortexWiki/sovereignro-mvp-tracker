import { Bell } from "lucide-react";
import { DndContext, PointerSensor, useSensor, useSensors, pointerWithin, rectIntersection } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import SearchBar from "../components/SearchBar";
import FavoriteBar from "../components/FavoriteBar";
import ActiveHunt from "../components/ActiveHunt";

// Drag sources/targets on the dashboard: only Active Hunt cards and
// Favorites cards are draggable. Search results are click-to-add only, no
// drag. Active Hunt cards can be reordered among themselves or dropped onto
// Favorites; Favorites cards can be reordered or dropped back onto Active
// Hunt. One shared DndContext is needed so dragging can cross between the
// two sections, not just reorder within one.
export default function Dashboard({
    activeHunt,
    favorites,
    addMvp,
    updateMvp,
    moveToFavorites,
    unfavoriteInActiveHunt,
    moveToActiveHunt,
    removeFromFavorites,
    removeFromActiveHunt,
    reorderActiveHunt,
    reorderFavorites,
    alarmPrefs
}) {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 3 }
        })
    );

    // pointerWithin (does the cursor sit inside a droppable's actual
    // bounds?) is far more forgiving than a center-distance algorithm here,
    // since our drop zones (Active Hunt / Favorites) are large areas that
    // may contain several cards — the user expects "anywhere over the
    // section" to count, not just near a card's center. Falls back to
    // rectIntersection if the pointer briefly isn't over anything (e.g.
    // fast movement between zones).
    function collisionDetection(args) {
        const pointerCollisions = pointerWithin(args);
        if (pointerCollisions.length > 0) {
            return pointerCollisions;
        }
        return rectIntersection(args);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (!over) {
            return;
        }

        const activeData = active.data.current;
        const overData = over.data.current;

        if (!activeData) {
            return;
        }

        // Dragging an Active Hunt card. Dropping it anywhere over the
        // Favorites zone — the empty drop-zone itself, or on top of a card
        // that's already there — moves it to Favorites. Only a drop inside
        // Active Hunt's own area (empty zone or another Active Hunt card)
        // reorders instead.
        if (activeData.source === "active-hunt") {
            const overIsFavoritesZone = overData?.zone === "favorites" || over.id === "favorites-zone";
            const overIsFavoriteCard = overData?.source === "favorites";

            if (overIsFavoritesZone || overIsFavoriteCard) {
                moveToFavorites(activeData.mvp.id);
                return;
            }

            // Reordering within Active Hunt.
            if (overData?.source === "active-hunt" && active.id !== over.id) {
                const oldIndex = activeHunt.findIndex((m) => m.id === activeData.mvp.id);
                const newIndex = activeHunt.findIndex((m) => m.id === overData.mvp.id);
                if (oldIndex !== -1 && newIndex !== -1) {
                    reorderActiveHunt(arrayMove(activeHunt, oldIndex, newIndex));
                }
            }
            return;
        }

        // Dragging a Favorites card. Same idea in reverse: dropping over the
        // Active Hunt zone or over a card already in Active Hunt sends it
        // there; dropping over another Favorites card reorders instead.
        if (activeData.source === "favorites") {
            const overIsActiveHuntZone = overData?.zone === "active-hunt" || over.id === "active-hunt-zone";
            const overIsActiveHuntCard = overData?.source === "active-hunt";

            if (overIsActiveHuntZone || overIsActiveHuntCard) {
                moveToActiveHunt(activeData.mvp.id);
                return;
            }

            if (overData?.source === "favorites" && active.id !== over.id) {
                const oldIndex = favorites.findIndex((m) => m.id === activeData.mvp.id);
                const newIndex = favorites.findIndex((m) => m.id === overData.mvp.id);
                if (oldIndex !== -1 && newIndex !== -1) {
                    reorderFavorites(arrayMove(favorites, oldIndex, newIndex));
                }
            }
        }
    }

    return (
        <main className="page">

            <DndContext sensors={sensors} collisionDetection={collisionDetection} onDragEnd={handleDragEnd}>

                <div className="page-content">

                    <div className="page-header">

                        <h1>Dashboard</h1>

                        <button className="icon-btn" aria-label="Notifications">
                            <Bell size={19} />
                        </button>

                    </div>

                    <SearchBar addMvp={addMvp} />

                    <FavoriteBar
                        favorites={favorites}
                        moveToActiveHunt={moveToActiveHunt}
                        removeFromFavorites={removeFromFavorites}
                    />

                    <ActiveHunt
                        activeHunt={activeHunt}
                        updateMvp={updateMvp}
                        moveToFavorites={moveToFavorites}
                        unfavoriteInActiveHunt={unfavoriteInActiveHunt}
                        removeFromActiveHunt={removeFromActiveHunt}
                        alarmPrefs={alarmPrefs}
                    />

                </div>

            </DndContext>

        </main>
    );
}
