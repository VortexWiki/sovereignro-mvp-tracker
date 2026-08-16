// Mini-boss data, same structure and sourcing method as mvps.js
// (validated one by one against Divine-Pride screenshots).
//
// See mvps.js for the full structure comment.

import angelingSprite from "../assets/sprites/1096.gif";
import payFild04 from "../assets/maps/pay_fild04.webp";
import xmasDun01 from "../assets/maps/xmas_dun01.webp";
import yunoFild03 from "../assets/maps/yuno_fild03.webp";

import toadSprite from "../assets/sprites/1089.gif";
import cmdFild03 from "../assets/maps/cmd_fild03.webp";
import gefFild01 from "../assets/maps/gef_fild01.webp";

import masteringSprite from "../assets/sprites/1090.gif";
import prtMaze03 from "../assets/maps/prt_maze03.webp";
import yunoFild04 from "../assets/maps/yuno_fild04.webp";

import dragonFlySprite from "../assets/sprites/1091.gif";
import mocFild18 from "../assets/maps/moc_fild18.webp";

import vagabondWolfSprite from "../assets/sprites/1092.gif";
import prtMaze01 from "../assets/maps/prt_maze01.webp";

import eclipseSprite from "../assets/sprites/1093.gif";
import prtFild02 from "../assets/maps/prt_fild02.webp";

import ghostringSprite from "../assets/sprites/1120.gif";
import gldDun04 from "../assets/maps/gld_dun04.webp";
import treasure02 from "../assets/maps/treasure02.webp";

const minibosses = [
    {
        id: 1089,
        name: "Toad",
        sprite: toadSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1089",
        spawns: [
            {
                map: "cmd_fild03",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 90,
                mapImage: cmdFild03
            },
            {
                map: "gef_fild01",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 90,
                mapImage: gefFild01
            }
        ]
    },
    {
        id: 1090,
        name: "Mastering",
        sprite: masteringSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1090",
        spawns: [
            {
                map: "pay_fild04",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 90,
                mapImage: payFild04
            },
            {
                map: "prt_maze03",
                mapType: "open_world",
                special: null,
                respawnMin: 32,
                respawnMax: 35,
                mapImage: prtMaze03
            },
            {
                map: "xmas_dun01",
                mapType: "open_world",
                special: null,
                respawnMin: 30,
                respawnMax: 42,
                mapImage: xmasDun01
            },
            {
                map: "yuno_fild04",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 90,
                mapImage: yunoFild04
            }
        ]
    },
    {
        id: 1091,
        name: "Dragon Fly",
        sprite: dragonFlySprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1091",
        spawns: [
            {
                map: "moc_fild18",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 90,
                mapImage: mocFild18
            }
        ]
    },
    {
        id: 1092,
        name: "Vagabond Wolf",
        sprite: vagabondWolfSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1092",
        spawns: [
            {
                map: "prt_maze01",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 90,
                mapImage: prtMaze01
            },
            {
                map: "prt_maze03",
                mapType: "open_world",
                special: null,
                respawnMin: 32,
                respawnMax: 35,
                mapImage: prtMaze03
            }
        ]
    },
    {
        id: 1093,
        name: "Eclipse",
        sprite: eclipseSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1093",
        spawns: [
            {
                map: "prt_fild02",
                mapType: "open_world",
                special: null,
                respawnMin: 30,
                respawnMax: 50,
                mapImage: prtFild02
            },
            {
                map: "prt_maze03",
                mapType: "open_world",
                special: null,
                respawnMin: 32,
                respawnMax: 35,
                mapImage: prtMaze03
            }
        ]
    },
    {
        id: 1096,
        name: "Angeling",
        sprite: angelingSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1096/angeling",
        spawns: [
            {
                map: "pay_fild04",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 90,
                mapImage: payFild04
            },
            {
                map: "xmas_dun01",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 90,
                mapImage: xmasDun01
            },
            {
                map: "yuno_fild03",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 90,
                mapImage: yunoFild03
            }
        ]
    },
    {
        id: 1120,
        name: "Ghostring",
        sprite: ghostringSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1120",
        spawns: [
            {
                map: "gld_dun04",
                mapType: "open_world",
                special: null,
                respawnMin: 113,
                respawnMax: 170,
                mapImage: gldDun04
            },
            {
                map: "pay_fild04",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 90,
                mapImage: payFild04
            },
            {
                map: "treasure02",
                mapType: "open_world",
                special: null,
                respawnMin: 33,
                respawnMax: 53,
                mapImage: treasure02
            }
        ]
    }
];

export default minibosses;
