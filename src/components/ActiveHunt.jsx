import { Target, Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import Section from "./Section";
import TimerCard from "./TimerCard";

export default function ActiveHunt({
    activeHunt,
    updateMvp,
    moveToFavorites,
    unfavoriteInActiveHunt,
    removeFromActiveHunt,
    alarmPrefs
}) {
    const { setNodeRef, isOver } = useDroppable({
        id: "active-hunt-zone",
        data: { zone: "active-hunt" }
    });

    function handleStop(mvp) {
        if (mvp.isFavorite) {
            moveToFavorites(mvp.id);
        } else {
            removeFromActiveHunt(mvp.id);
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

    return (

        <Section
            icon={Target}
            iconColor="var(--gold)"
            title="Active Hunt"
            subtitle="Drag & Drop your active hunt"
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
                                    onStop={() => handleStop(mvp)}
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
