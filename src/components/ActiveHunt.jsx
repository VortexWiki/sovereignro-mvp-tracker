import { Target, Plus, X } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import Section from "./Section";
import TimerCard from "./TimerCard";

export default function ActiveHunt({
    activeHunt,
    updateMvp,
    updateNote,
    moveToFavorites,
    unfavoriteInActiveHunt,
    removeFromActiveHunt,
    clearActiveHunt,
    alarmPrefs
}) {
    const { setNodeRef, isOver } = useDroppable({
        id: "active-hunt-zone",
        data: { zone: "active-hunt" }
    });

    // Receives the mvp object straight from TimerCard's handleStopTimer,
    // already carrying every spawn's killedAt reset to null — NOT the
    // stale `mvp` closed over from the .map() below, whose timers may not
    // reflect the reset yet (see the race explained in TimerCard.jsx).
    // moveToFavorites/removeFromActiveHunt take this object directly rather
    // than re-reading activeHunt by id, so the reset actually lands.
    function handleStop(updatedMvp) {
        if (updatedMvp.isFavorite) {
            moveToFavorites(updatedMvp);
        } else {
            removeFromActiveHunt(updatedMvp.id);
        }
    }

    // Star button toggle: not favorited yet -> send to Favorites. Already
    // favorited -> just clear the flag, card stays in Active Hunt.
    function handleToggleFavorite(mvp) {
        if (mvp.isFavorite) {
            unfavoriteInActiveHunt(mvp.id);
        } else {
            moveToFavorites(mvp.id);
        }
    }

    // Confirms before wiping the whole section — same one-click-away
    // destructive action pattern as Backup's restore confirm, since there's
    // no undo once these cards are gone (favorited ones land back in
    // Favorites though, see clearActiveHunt in App.jsx).
    function handleClearAll() {
        const confirmed = window.confirm(
            `Clear all ${activeHunt.length} monster(s) from Active Hunt? ` +
            `Favorited ones will move back to Favorites, the rest will just be removed. This can't be undone.`
        );

        if (confirmed) {
            clearActiveHunt();
        }
    }

    return (

        <Section
            icon={Target}
            iconColor="var(--gold)"
            title="Active Hunt"
            subtitle="Drag & Drop your active hunt"
            action={activeHunt.length > 0 && (

                <button
                    type="button"
                    className="section-clear-all"
                    onClick={handleClearAll}
                    aria-label="Clear all"
                    data-tooltip="Clear all"
                >
                    <X size={15} />
                    <span>Clear all</span>
                </button>

            )}
        >

            <div ref={setNodeRef} className="drop-target-area">

                {activeHunt.length === 0 ? (

                    <div className={`drop-zone${isOver ? " drop-zone--active" : ""}`}>

                        <Plus size={18} className="drop-zone-icon" />

                        <span>Add an MVP to your hunt</span>

                    </div>

                ) : (

                    <SortableContext
                        items={activeHunt.map((mvp) => mvp.id)}
                        strategy={rectSortingStrategy}
                    >

                        <div className={`hunt-grid${isOver ? " hunt-grid--drop-target" : ""}`}>

                            {activeHunt.map((mvp) => (

                                <TimerCard
                                    key={mvp.id}
                                    mvp={mvp}
                                    onUpdateMvp={updateMvp}
                                    onSaveNote={(text) => updateNote(mvp.id, text)}
                                    onStop={handleStop}
                                    onToggleFavorite={() => handleToggleFavorite(mvp)}
                                    alarmPrefs={alarmPrefs}
                                />

                            ))}

                        </div>

                    </SortableContext>

                )}

            </div>

        </Section>

    );

}
