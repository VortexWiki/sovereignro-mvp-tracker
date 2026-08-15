// MVP boss data, sourced and validated one by one against screenshots to
// avoid scraping/transcription errors. No full stat/loot database here on
// purpose — divinePrideUrl links out to Divine-Pride for anyone who wants
// those details. Sprites and map images are local assets (downloaded once,
// not hotlinked) — see src/assets/sprites and src/assets/maps.
//
// Structure per entry:
// {
//   id: 1039,                 // Divine-Pride / ro-mvp.com monster ID
//   name: "Baphomet",
//   sprite: <imported gif>,
//   divinePrideUrl: "https://www.divine-pride.net/database/monster/1039/baphomet",
//   cardEffect: "text",        // optional, free text — the MVP card's effect
//                              // when equipped, shown in the info popup
//   specialCondition: "text",  // optional, free text — a spawn condition
//                              // beyond the normal cooldown (e.g. "Spawns
//                              // after 1600 kills on this map"), shown in
//                              // the info popup
//   spawns: [
//     {
//       map: "prt_maze03",
//       mapType: "open_world",   // "open_world" | "instance"
//       special: null,            // e.g. "Endless Tower floor 3", or null
//       respawnMin: 120,          // minutes, null if unknown
//       respawnMax: 130,
//       mapImage: <imported webp> | null
//     },
//     ...
//   ]
// }
//
// Both cardEffect and specialCondition are optional — the info popup shows
// a neutral placeholder when a MVP doesn't have one yet. Note (mvp.note) is
// NOT part of this static data — it's a free-form user note stored on the
// live tracked item at runtime, not something we source/validate here.

import baphometSprite from "../assets/sprites/1039.gif";
import prtMaze03 from "../assets/maps/prt_maze03.webp";
import gldDun03 from "../assets/maps/gld_dun03.webp";
import tower3 from "../assets/maps/3@tower.webp";

import ultraLimacinaSprite from "../assets/sprites/21537.gif";
import jorBack3 from "../assets/maps/jor_back3.webp";

const mvps = [
    {
        id: 1039,
        name: "Baphomet",
        sprite: baphometSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1039/baphomet",
        spawns: [
            {
                map: "prt_maze03",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: prtMaze03
            },
            {
                map: "gld_dun03",
                mapType: "open_world",
                special: null,
                respawnMin: 480,
                respawnMax: 490,
                mapImage: gldDun03
            },
            {
                map: "3@tower",
                mapType: "instance",
                special: "Endless Tower floor 3",
                respawnMin: null,
                respawnMax: null,
                mapImage: tower3
            }
        ]
    },
    {
        id: 21537,
        name: "Ultra Limacina",
        sprite: ultraLimacinaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/21537/ultra-limacina",
        spawns: [
            {
                map: "jor_back3",
                mapType: "open_world",
                special: null,
                respawnMin: 360,
                respawnMax: 360,
                mapImage: jorBack3
            }
        ]
    }
];

export default mvps;
