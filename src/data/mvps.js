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
// specialCondition is optional — the info popup shows a neutral placeholder
// when a MVP doesn't have one yet. Note (mvp.note) is NOT part of this
// static data — it's a free-form user note stored on the live tracked item
// at runtime, not something we source/validate here.

import baphometSprite from "../assets/sprites/1039.gif";
import prtMaze03 from "../assets/maps/prt_maze03.webp";
import gldDun03 from "../assets/maps/gld_dun03.webp";
import tower3 from "../assets/maps/3@tower.webp";

import ultraLimacinaSprite from "../assets/sprites/21537.gif";
import jorBack3 from "../assets/maps/jor_back3.webp";

import osirisSprite from "../assets/sprites/1038.gif";
import mocPryd04 from "../assets/maps/moc_pryd04.webp";

import doppelgangerSprite from "../assets/sprites/1046.gif";
import gefDun02 from "../assets/maps/gef_dun02.webp";
import gldDun04 from "../assets/maps/gld_dun04.webp";

import mistressSprite from "../assets/sprites/1059.gif";
import gldDun02 from "../assets/maps/gld_dun02.webp";
import mjolnir04 from "../assets/maps/mjolnir_04.webp";

import goldenThiefBugSprite from "../assets/sprites/1086.gif";
import prtSewb4 from "../assets/maps/prt_sewb4.webp";

import orcHeroSprite from "../assets/sprites/1087.gif";
import gefFild03 from "../assets/maps/gef_fild03.webp";

import drakeSprite from "../assets/sprites/1112.gif";
import treasure02 from "../assets/maps/treasure02.webp";

import eddgaSprite from "../assets/sprites/1115.gif";
import gldDun01_2 from "../assets/maps/gld_dun01_2.webp";
import payFild10 from "../assets/maps/pay_fild10.webp";

import mayaSprite from "../assets/sprites/1147.gif";
import anthell02 from "../assets/maps/anthell02.webp";
import gldDun02_2 from "../assets/maps/gld_dun02_2.webp";

import moonlightFlowerSprite from "../assets/sprites/1150.gif";
import gldDun01 from "../assets/maps/gld_dun01.webp";
import payDun04 from "../assets/maps/pay_dun04.webp";

import pharaohSprite from "../assets/sprites/1157.gif";
import inSphinx5 from "../assets/maps/in_sphinx5.webp";

import phreeoniSprite from "../assets/sprites/1159.gif";
import mocFild17 from "../assets/maps/moc_fild17.webp";

const mvps = [
    {
        id: 1038,
        name: "Osiris",
        sprite: osirisSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1038",
        spawns: [
            {
                map: "moc_pryd04",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 70,
                mapImage: mocPryd04
            }
        ]
    },
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
                respawnMin: 60,
                respawnMax: 70,
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
        id: 1046,
        name: "Doppelganger",
        sprite: doppelgangerSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1046",
        spawns: [
            {
                map: "gef_dun02",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 70,
                mapImage: gefDun02
            },
            {
                map: "gld_dun04",
                mapType: "open_world",
                special: null,
                respawnMin: 480,
                respawnMax: 490,
                mapImage: gldDun04
            }
        ]
    },
    {
        id: 1059,
        name: "Mistress",
        sprite: mistressSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1059",
        spawns: [
            {
                map: "gld_dun02",
                mapType: "open_world",
                special: null,
                respawnMin: 480,
                respawnMax: 490,
                mapImage: gldDun02
            },
            {
                map: "mjolnir_04",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: mjolnir04
            }
        ]
    },
    {
        id: 1086,
        name: "Golden Thief Bug",
        sprite: goldenThiefBugSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1086",
        spawns: [
            {
                map: "prt_sewb4",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 70,
                mapImage: prtSewb4
            }
        ]
    },
    {
        id: 1087,
        name: "Orc Hero",
        sprite: orcHeroSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1087",
        spawns: [
            {
                map: "gef_fild03",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 70,
                mapImage: gefFild03
            }
        ]
    },
    {
        id: 1112,
        name: "Drake",
        sprite: drakeSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1112",
        spawns: [
            {
                map: "treasure02",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: treasure02
            }
        ]
    },
    {
        id: 1115,
        name: "Eddga",
        sprite: eddgaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1115",
        spawns: [
            {
                map: "gld_dun01_2",
                mapType: "open_world",
                special: null,
                respawnMin: 480,
                respawnMax: 490,
                mapImage: gldDun01_2
            },
            {
                map: "pay_fild10",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: payFild10
            }
        ]
    },
    {
        id: 1147,
        name: "Maya",
        sprite: mayaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1147",
        spawns: [
            {
                map: "anthell02",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: anthell02
            },
            {
                map: "gld_dun02_2",
                mapType: "open_world",
                special: null,
                respawnMin: 480,
                respawnMax: 490,
                mapImage: gldDun02_2
            },
            {
                map: "gld_dun02",
                mapType: "open_world",
                special: null,
                respawnMin: 480,
                respawnMax: 490,
                mapImage: gldDun02
            }
        ]
    },
    {
        id: 1150,
        name: "Moonlight Flower",
        sprite: moonlightFlowerSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1150",
        spawns: [
            {
                map: "gld_dun01",
                mapType: "open_world",
                special: null,
                respawnMin: 480,
                respawnMax: 490,
                mapImage: gldDun01
            },
            {
                map: "pay_dun04",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 70,
                mapImage: payDun04
            }
        ]
    },
    {
        id: 1157,
        name: "Pharaoh",
        sprite: pharaohSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1157",
        spawns: [
            {
                map: "in_sphinx5",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 70,
                mapImage: inSphinx5
            }
        ]
    },
    {
        id: 1159,
        name: "Phreeoni",
        sprite: phreeoniSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1159",
        spawns: [
            {
                map: "moc_fild17",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: mocFild17
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
