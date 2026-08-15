// Respawn timer logic for a single spawn (one map entry of a monster).
//
// A spawn's timer lives on the spawn object itself (spawn.killedAt, a
// timestamp in ms) rather than on the TimerCard, so each map a MVP can
// spawn on tracks its own independent countdown — switching which map is
// displayed on a card (via the map popup) never resets or mixes up another
// map's timer.
//
// Phases, based on minutes elapsed since killedAt:
// - "unknown": no kill has been logged yet (killedAt is null) — neutral/gray.
// - "counting_down": elapsed < respawnMin — red, MVP definitely not up yet.
// - "spawn_window": respawnMin <= elapsed < respawnMax — yellow, MVP might
//   be up already, this is the "could spawn any time now" window.
// - "spawned": elapsed >= respawnMax — green, MVP is expected to be up.
//
// If a spawn has no known respawn data (respawnMin/Max null), the timer
// never leaves "unknown" — there's nothing to count down.

export function getTimerStatus(spawn, nowMs) {
    if (!spawn.killedAt || spawn.respawnMin == null || spawn.respawnMax == null) {
        return "unknown";
    }

    const elapsedMinutes = (nowMs - spawn.killedAt) / 60000;

    if (elapsedMinutes < spawn.respawnMin) {
        return "counting_down";
    }

    if (elapsedMinutes < spawn.respawnMax) {
        return "spawn_window";
    }

    return "spawned";
}

// Seconds remaining until the next phase boundary (0 once "spawned" is
// reached, since there's nothing left to count down to).
export function getSecondsRemaining(spawn, nowMs) {
    if (!spawn.killedAt || spawn.respawnMin == null || spawn.respawnMax == null) {
        return 0;
    }

    const status = getTimerStatus(spawn, nowMs);
    const elapsedMs = nowMs - spawn.killedAt;

    if (status === "counting_down") {
        return Math.max(0, Math.round((spawn.respawnMin * 60000 - elapsedMs) / 1000));
    }

    if (status === "spawn_window") {
        return Math.max(0, Math.round((spawn.respawnMax * 60000 - elapsedMs) / 1000));
    }

    return 0;
}

export function formatClock(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);

    const pad = (n) => String(n).padStart(2, "0");

    return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export const TIMER_STATUS_LABEL = {
    unknown: "⚪ Unknown",
    counting_down: "🔴 Not Spawned",
    spawn_window: "🟡 Spawn Possible",
    spawned: "🟢 Spawned"
};

// Lets the user manually set "X minutes remaining" instead of only being
// able to log a kill (Restart). Rather than storing a separate override
// field, we back-solve for the killedAt timestamp that would produce
// exactly this many minutes remaining right now — the rest of the timer
// logic (getTimerStatus, getSecondsRemaining, the spawn_window alarm edge
// detection) then keeps working unchanged, since it all still just reads
// killedAt.
//
// Which boundary "minutes remaining" counts down to depends on the phase
// the card is currently in: counting_down counts down to respawnMin (not
// spawned yet), spawn_window counts down to respawnMax (fully spawned).
// If the card has no kill logged yet (status "unknown"), we treat the
// input as counting down to respawnMin, i.e. as if a kill just happened
// respawnMin-minutesRemaining minutes ago — the most useful interpretation
// when there's no existing timer to preserve the phase of.
export function setMinutesRemaining(spawn, minutesRemaining, nowMs) {
    if (spawn.respawnMin == null || spawn.respawnMax == null) {
        return spawn.killedAt;
    }

    const status = getTimerStatus(spawn, nowMs);
    const targetBoundaryMinutes = status === "spawn_window" ? spawn.respawnMax : spawn.respawnMin;

    const elapsedMinutes = targetBoundaryMinutes - minutesRemaining;
    return nowMs - elapsedMinutes * 60000;
}
