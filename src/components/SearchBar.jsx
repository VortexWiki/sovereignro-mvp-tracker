import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import ALL_MONSTERS from "../data/allMonsters";
import { searchMonsters } from "../utils/search";
import { getPrimarySpawn } from "../utils/maps";
import MonsterSprite from "./MonsterSprite";

export default function SearchBar({ addMvp }) {
    const [query, setQuery] = useState("");

    const results = useMemo(() => {
        return searchMonsters(ALL_MONSTERS, query);
    }, [query]);

    function handleSelect(monster) {
        addMvp(monster);
        setQuery("");
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && results.length > 0) {
            e.preventDefault();
            handleSelect(results[0]);
        }
    }

    return (
        <div className="search-wrap">

            <div className="search-bar">

                <Search size={19} className="search-icon" />

                <input
                    type="text"
                    placeholder="Search MVP..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="search-input"
                />

            </div>

            {results.length > 0 && (

                <div className="search-results">

                    {results.map((monster) => {

                        const spawn = getPrimarySpawn(monster.spawns);

                        return (

                            <button
                                key={`${monster.category}-${monster.id}`}
                                onClick={() => handleSelect(monster)}
                                className="search-result"
                            >

                                <div className="search-result-main">

                                    <MonsterSprite
                                        sprite={monster.sprite}
                                        name={monster.name}
                                        size={40}
                                    />

                                    <div>

                                        <div className="search-result-name">
                                            {monster.name}
                                            {monster.category === "miniboss" && (
                                                <span className="search-result-badge">Mini-boss</span>
                                            )}
                                        </div>

                                        <div className="search-result-map">
                                            {spawn ? spawn.map : "Unknown"}
                                        </div>

                                    </div>

                                </div>

                                <div className="search-result-timer">
                                    {spawn && spawn.respawnMin != null
                                        ? `${spawn.respawnMin}~${spawn.respawnMax}m`
                                        : "Respawn unknown"}
                                </div>

                            </button>

                        );

                    })}

                </div>

            )}

        </div>
    );
}
