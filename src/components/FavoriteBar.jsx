import { Star, Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import Section from "./Section";
import FavoriteCard from "./FavoriteCard";

export default function FavoriteBar({ favorites, moveToActiveHunt, removeFromFavorites }) {
    const { setNodeRef, isOver } = useDroppable({
        id: "favorites-zone",
        data: { zone: "favorites" }
    });

    return (

        <Section
            icon={Star}
            iconColor="var(--gold)"
            title="Favorites"
            subtitle="Drag & Drop your favorites"
        >

            <div ref={setNodeRef} className="drop-target-area">

                {favorites.length === 0 ? (

                    <div className={`drop-zone${isOver ? " drop-zone--active" : ""}`}>

                        <Plus size={18} className="drop-zone-icon" />

                        <span>Add an MVP to your favorites</span>

                    </div>

                ) : (

                    <SortableContext
                        items={favorites.map((mvp) => `favorite-${mvp.id}`)}
                        strategy={rectSortingStrategy}
                    >

                        <div className={`favorite-grid${isOver ? " favorite-grid--drop-target" : ""}`}>

                            {favorites.map((mvp) => (

                                <FavoriteCard
                                    key={mvp.id}
                                    mvp={mvp}
                                    onMoveToActiveHunt={() => moveToActiveHunt(mvp.id)}
                                    onRemoveFromFavorites={() => removeFromFavorites(mvp.id)}
                                />

                            ))}

                        </div>

                    </SortableContext>

                )}

            </div>

        </Section>

    );

}
