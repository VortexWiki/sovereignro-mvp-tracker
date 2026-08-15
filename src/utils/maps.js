// Given a monster's `spawns` list (see data/mvps.js for the shape), pick the
// most relevant one to show on a compact card: prefer an open-world spawn
// over an instance, since that's usually where players actually hunt.
export function getPrimarySpawn(spawns) {
    if (!spawns || spawns.length === 0) {
        return null;
    }

    const openWorld = spawns.find((spawn) => spawn.mapType !== "instance");

    return openWorld || spawns[0];
}
