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

import darkIllusionSprite from "../assets/sprites/1302.gif";
import glChyard from "../assets/maps/gl_chyard.webp";
import gldDun04_2 from "../assets/maps/gld_dun04_2.webp";
import gld2Gef from "../assets/maps/gld2_gef.webp";

import arcAngelingSprite from "../assets/sprites/1388.gif";

import devilingSprite from "../assets/sprites/1582.gif";

import valkyrieSprite from "../assets/sprites/1765.gif";
import odinTem03 from "../assets/maps/odin_tem03.webp";

import hardrockMammothSprite from "../assets/sprites/1990.gif";
import manFild03 from "../assets/maps/man_fild03.webp";

import tendrillionSprite from "../assets/sprites/1991.gif";
import splFild03 from "../assets/maps/spl_fild03.webp";

import loraSprite from "../assets/sprites/2250.gif";
import gld2Prt from "../assets/maps/gld2_prt.webp";

import bomiSprite from "../assets/sprites/3756.gif";
import gefD01_i from "../assets/maps/gef_d01_i.webp";

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
    },
    {
        id: 1302,
        name: "Dark Illusion",
        sprite: darkIllusionSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1302",
        spawns: [
            {
                map: "gl_chyard",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 70,
                mapImage: glChyard
            },
            {
                map: "gld_dun04_2",
                mapType: "open_world",
                special: null,
                respawnMin: 20,
                respawnMax: 20,
                mapImage: gldDun04_2
            },
            {
                map: "gld2_gef",
                mapType: "open_world",
                special: null,
                respawnMin: 20,
                respawnMax: 20,
                mapImage: gld2Gef
            }
        ]
    },
    {
        id: 1388,
        name: "Arc Angeling",
        sprite: arcAngelingSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1388",
        spawns: [
            {
                map: "yuno_fild04",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 70,
                mapImage: yunoFild04
            }
        ]
    },
    {
        id: 1765,
        name: "Valkyrie",
        sprite: valkyrieSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1765",
        spawns: [
            {
                map: "odin_tem03",
                mapType: "open_world",
                special: null,
                respawnMin: 90,
                respawnMax: 120,
                mapImage: odinTem03
            }
        ]
    },
    {
        id: 1990,
        name: "Hardrock Mammoth",
        sprite: hardrockMammothSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1990",
        spawns: [
            {
                map: "man_fild03",
                mapType: "open_world",
                special: null,
                respawnMin: 240,
                respawnMax: 240,
                mapImage: manFild03
            }
        ]
    },
    {
        id: 1991,
        name: "Tendrillion",
        sprite: tendrillionSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1991",
        specialCondition: "2x",
        spawns: [
            {
                map: "spl_fild03",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 60,
                mapImage: splFild03
            }
        ]
    },
    {
        id: 2250,
        name: "Lora",
        sprite: loraSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2250",
        specialCondition: "Hall of the Abyss : Warrior road",
        spawns: [
            {
                map: "gld2_prt",
                mapType: "open_world",
                special: null,
                respawnMin: 30,
                respawnMax: 40,
                mapImage: gld2Prt
            }
        ]
    },
    {
        id: 3756,
        name: "Bomi",
        sprite: bomiSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/3756",
        spawns: [
            {
                map: "gef_d01_i",
                mapType: "instance",
                special: null,
                respawnMin: 120,
                respawnMax: 120,
                mapImage: gefD01_i
            }
        ]
    },
    {
        id: 1582,
        name: "Deviling",
        sprite: devilingSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1582",
        spawns: [
            {
                map: "pay_fild04",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 180,
                mapImage: payFild04
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
    }
];

export default minibosses;
