import { useMemo, useState } from "react";
import { Bell, Search, Plus, Star } from "lucide-react";

import ALL_MONSTERS from "../data/allMonsters";
import { getPrimarySpawn } from "../utils/maps";
import MonsterSprite from "../components/MonsterSprite";

// Full list of every MVP and mini-boss in the tracker's data, one row each,
// with quick-add buttons — unlike SearchBar (which only surfaces matches
// while typing and adds straight to Active Hunt), this page is meant for
// browsing the whole roster and adding to either Active Hunt or Favorites
// directly, without needing to know a name to search for first.
export default function MonsterList({ isTracked, isFavorited, addMvp, addToFavorites, onNavigate }) {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("all"); // "all" | "mvp" | "miniboss"

    const monsters = useMemo(() => {
        return ALL_MONSTERS
            .filter((m) => filter === "all" || m.category === filter)
            .filter((m) => m.name.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [query, filter]);

    return (
        <main className="page">

            <div className="page-content">

                <div className="page-header">

                    <h1>Monster List</h1>

                    <button
                        className="icon-btn"
                        aria-label="Notification settings"
                        data-tooltip="Notification settings"
                        onClick={() => onNavigate?.("settings")}
                    >
                        <Bell size={19} />
                    </button>

                </div>

                <div className="monster-list-controls">

                    <div className="search-bar">

                        <Search size={19} className="search-icon" />

                        <input
                            type="text"
                            placeholder="Filter by name..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="search-input"
                        />

                    </div>

                    <div className="monster-list-filters">

                        {[
                            { key: "all", label: "All" },
                            { key: "mvp", label: "MVP" },
                            { key: "miniboss", label: "Mini-boss" }
                        ].map(({ key, label }) => (

                            <button
                                key={key}
                                type="button"
                                className={`monster-list-filter${filter === key ? " monster-list-filter--active" : ""}`}
                                onClick={() => setFilter(key)}
                            >
                                {label}
                            </button>

                        ))}

                    </div>

                </div>

                <div className="monster-list-table">

                    {monsters.length === 0 ? (

                        <p className="monster-list-empty">No monster matches this filter.</p>

                    ) : (

                        monsters.map((monster) => {
                            const spawn = getPrimarySpawn(monster.spawns);
                            const tracked = isTracked(monster.id);
                            const favorited = isFavorited(monster.id);

                            return (

                                <div key={`${monster.category}-${monster.id}`} className="monster-list-row">

                                    <MonsterSprite sprite={monster.sprite} name={monster.name} size={44} />

                                    <div className="monster-list-info">

                                        <div className="monster-list-name">
                                            {monster.name}
                                            {monster.category === "miniboss" && (
                                                <span className="search-result-badge">Mini-boss</span>
                                            )}
                                        </div>

                                        <div className="monster-list-map">
                                            {spawn ? spawn.map : "Unknown"}
                                            {monster.spawns && monster.spawns.length > 1 && (
                                                <span className="timer-card-map-extra"> +{monster.spawns.length - 1}</span>
                                            )}
                                        </div>

                                    </div>

                                    <div className="monster-list-respawn">
                                        {spawn && spawn.respawnMin != null
                                            ? `${spawn.respawnMin}~${spawn.respawnMax}m`
                                            : "Respawn unknown"}
                                    </div>

                                    <div className="monster-list-actions">

                                        <button
                                            type="button"
                                            className="monster-list-action"
                                            onClick={() => addMvp(monster)}
                                            disabled={tracked}
                                            aria-label="Add to Active Hunt"
                                            data-tooltip={tracked ? "Already tracked" : "Add to Active Hunt"}
                                        >
                                            <Plus size={16} />
                                        </button>

                                        <button
                                            type="button"
                                            className={`monster-list-action${favorited ? " monster-list-action--favorite" : ""}`}
                                            onClick={() => addToFavorites(monster)}
                                            disabled={tracked}
                                            aria-label="Add to Favorites"
                                            data-tooltip={favorited ? "In Favorites" : (tracked ? "Already tracked" : "Add to Favorites")}
                                        >
                                            <Star size={16} fill={favorited ? "currentColor" : "none"} />
                                        </button>

                                    </div>

                                </div>

                            );
                        })

                    )}

                </div>

            </div>

        </main>
    );
}
