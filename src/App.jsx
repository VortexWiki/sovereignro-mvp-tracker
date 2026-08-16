import { useEffect, useRef, useState } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import MonsterList from "./pages/MonsterList";
import Backup from "./pages/Backup";
import Settings from "./pages/Settings";
import Footer from "./components/Footer";
import {
    loadState,
    saveState,
    loadPreferences,
    savePreferences,
    clearAllData,
    loadMonsterNotes,
    saveMonsterNotes,
    applyMonsterNotes
} from "./utils/persistence";

export default function App() {
    // Which page is showing. Kept as simple state here rather than pulling
    // in a router — this is a two-page app, a real router would be
    // overkill.
    const [currentPage, setCurrentPage] = useState("dashboard");

    const [activeHunt, setActiveHunt] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // Notes are keyed by monster id, independent of Active Hunt/Favorites
    // tracking — the same note shows up on a TimerCard/FavoriteCard (if
    // tracked) and on the Monster List row either way. { [id]: "text" },
    // only non-empty notes are kept (see persistence.js).
    const [monsterNotes, setMonsterNotes] = useState({});

    // Has the initial load-from-IndexedDB finished? We must not let the
    // save effect fire on the very first render (it would immediately
    // overwrite the saved data with the still-empty initial state before
    // loadState's result comes back).
    const [hydrated, setHydrated] = useState(false);
    const isFirstSaveSkip = useRef(true);

    // Sound/notification preferences, loaded once and kept in sync with
    // IndexedDB from the Settings page. Passed down to TimerCard (via
    // Dashboard -> ActiveHunt) so it knows which sound to play and whether
    // notifications are opted into when a spawn_window transition happens.
    const [prefs, setPrefs] = useState(null);

    useEffect(() => {
        let cancelled = false;

        loadState().then((saved) => {
            if (cancelled) {
                return;
            }
            if (saved) {
                setActiveHunt(saved.activeHunt);
                setFavorites(saved.favorites);
            }
            setHydrated(true);
        });

        loadPreferences().then((saved) => {
            if (!cancelled) {
                setPrefs(saved);
            }
        });

        loadMonsterNotes().then((saved) => {
            if (!cancelled) {
                setMonsterNotes(saved);
            }
        });

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!hydrated) {
            return;
        }
        // Also skip the render right after hydration finishes — at that
        // point activeHunt/favorites already match storage, saving again
        // is harmless but wasteful.
        if (isFirstSaveSkip.current) {
            isFirstSaveSkip.current = false;
            return;
        }
        saveState(activeHunt, favorites);
    }, [activeHunt, favorites, hydrated]);

    function updatePrefs(changes) {
        const updated = { ...prefs, ...changes };
        setPrefs(updated);
        savePreferences(updated);
    }

    // Sets (or clears, on empty text) the shared note for a monster by id.
    // Independent of tracking — works the same whether that monster is in
    // Active Hunt, Favorites, or neither. Empty text removes the key
    // entirely rather than storing "", keeping monsterNotes free of dead
    // entries over time.
    function updateNote(monsterId, text) {
        const updated = { ...monsterNotes };
        if (text) {
            updated[monsterId] = text;
        } else {
            delete updated[monsterId];
        }
        setMonsterNotes(updated);
        saveMonsterNotes(updated);
    }

    // Wipes IndexedDB entirely (tracker data + preferences + notes) and
    // resets the app back to a first-visit state. Used by the Settings
    // page's "reset to zero" button.
    async function resetEverything() {
        await clearAllData();
        setActiveHunt([]);
        setFavorites([]);
        setMonsterNotes({});
        const freshPrefs = await loadPreferences();
        setPrefs(freshPrefs);
    }

    function isTracked(mvpId) {
        return (
            activeHunt.some((item) => item.id === mvpId) ||
            favorites.some((item) => item.id === mvpId)
        );
    }

    // Specifically "is this in Favorites right now" — narrower than
    // isTracked, used to light up the star button gold on the Monster List
    // page (an item merely sitting in Active Hunt, not favorited, shouldn't
    // show a gold star there).
    function isFavorited(mvpId) {
        return favorites.some((item) => item.id === mvpId);
    }

    // Adds a monster to Active Hunt (from search, or the Monster List page).
    function addMvp(mvp) {
        if (isTracked(mvp.id)) {
            return;
        }

        setActiveHunt([...activeHunt, mvp]);
    }

    // Adds a monster straight to Favorites (from the Monster List page) —
    // skips Active Hunt entirely, unlike moveToFavorites which moves an
    // item that's already being tracked there.
    function addToFavorites(mvp) {
        if (isTracked(mvp.id)) {
            return;
        }

        setFavorites([...favorites, { ...mvp, isFavorite: true }]);
    }

    function updateMvp(updatedMvp) {
        setActiveHunt(
            activeHunt.map((item) => (item.id === updatedMvp.id ? updatedMvp : item))
        );
    }

    // Moves a monster from Active Hunt to Favorites (drag-and-drop, or the
    // star button on a not-yet-favorited Active Hunt card). Its timer state
    // travels with it but Stop already resets killedAt to null before this
    // is called.
    function moveToFavorites(mvpId) {
        const mvp = activeHunt.find((item) => item.id === mvpId);
        if (!mvp) {
            return;
        }

        setActiveHunt(activeHunt.filter((item) => item.id !== mvpId));
        setFavorites([...favorites, { ...mvp, isFavorite: true }]);
    }

    // Star button on an Active Hunt card that's already favorited: just
    // clears the flag, the card stays put in Active Hunt. A later Stop will
    // then remove it entirely instead of sending it back to Favorites.
    function unfavoriteInActiveHunt(mvpId) {
        setActiveHunt(
            activeHunt.map((item) =>
                item.id === mvpId ? { ...item, isFavorite: false } : item
            )
        );
    }

    // Moves a monster from Favorites into Active Hunt (drag-and-drop, or
    // clicking anywhere on a Favorites card).
    function moveToActiveHunt(mvpId) {
        const mvp = favorites.find((item) => item.id === mvpId);
        if (!mvp) {
            return;
        }

        setFavorites(favorites.filter((item) => item.id !== mvpId));
        setActiveHunt([...activeHunt, mvp]);
    }

    // Star button on a Favorites card: drops it from Favorites entirely,
    // does NOT send it to Active Hunt. Disappears from both lists.
    function removeFromFavorites(mvpId) {
        setFavorites(favorites.filter((item) => item.id !== mvpId));
    }

    // Drops a monster from Active Hunt entirely (Stop button on a
    // non-favorited card).
    function removeFromActiveHunt(mvpId) {
        setActiveHunt(activeHunt.filter((item) => item.id !== mvpId));
    }

    // Reorders Active Hunt cards after a drag within the grid.
    function reorderActiveHunt(newOrder) {
        setActiveHunt(newOrder);
    }

    function reorderFavorites(newOrder) {
        setFavorites(newOrder);
    }

    // Notes are merged onto the live objects at render time (not stored
    // inline on activeHunt/favorites — see monsterNotes above), so every
    // surface (TimerCard, FavoriteCard, Monster List) always shows the same
    // up-to-date note for a given monster id.
    const activeHuntWithNotes = applyMonsterNotes(activeHunt, monsterNotes);
    const favoritesWithNotes = applyMonsterNotes(favorites, monsterNotes);

    return (
        <div className="app">

            <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

            <div className="content">

                {currentPage === "monsters" && (

                    <MonsterList
                        isTracked={isTracked}
                        isFavorited={isFavorited}
                        addMvp={addMvp}
                        addToFavorites={addToFavorites}
                        monsterNotes={monsterNotes}
                        updateNote={updateNote}
                        onNavigate={setCurrentPage}
                    />

                )}

                {currentPage === "backup" && (

                    <Backup
                        activeHunt={activeHunt}
                        favorites={favorites}
                        monsterNotes={monsterNotes}
                        onRestore={(restored) => {
                            setActiveHunt(restored.activeHunt);
                            setFavorites(restored.favorites);
                            setMonsterNotes(restored.monsterNotes || {});
                            saveMonsterNotes(restored.monsterNotes || {});
                        }}
                        onNavigate={setCurrentPage}
                    />

                )}

                {currentPage === "settings" && prefs && (

                    <Settings
                        prefs={prefs}
                        onUpdatePrefs={updatePrefs}
                        onResetEverything={resetEverything}
                    />

                )}

                {currentPage === "dashboard" && (

                    <Dashboard
                        activeHunt={activeHuntWithNotes}
                        favorites={favoritesWithNotes}
                        addMvp={addMvp}
                        updateMvp={updateMvp}
                        updateNote={updateNote}
                        moveToFavorites={moveToFavorites}
                        unfavoriteInActiveHunt={unfavoriteInActiveHunt}
                        moveToActiveHunt={moveToActiveHunt}
                        removeFromFavorites={removeFromFavorites}
                        removeFromActiveHunt={removeFromActiveHunt}
                        reorderActiveHunt={reorderActiveHunt}
                        reorderFavorites={reorderFavorites}
                        alarmPrefs={prefs}
                        onNavigate={setCurrentPage}
                    />

                )}

                <Footer />

            </div>

        </div>
    );
}
