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

import orcLordSprite from "../assets/sprites/1190.gif";
import gefFild10 from "../assets/maps/gef_fild10.webp";

import stormyKnightSprite from "../assets/sprites/1251.gif";
import xmasDun02 from "../assets/maps/xmas_dun02.webp";

import hatiiGarmSprite from "../assets/sprites/1252.gif";
import xmasFild01 from "../assets/maps/xmas_fild01.webp";

import darkLordSprite from "../assets/sprites/1272.gif";
import glChyard from "../assets/maps/gl_chyard.webp";
import gldDun04_2 from "../assets/maps/gld_dun04_2.webp";

import turtleGeneralSprite from "../assets/sprites/1312.gif";
import turDun04 from "../assets/maps/tur_dun04.webp";

import draculaSprite from "../assets/sprites/1389.gif";
import gefDun01 from "../assets/maps/gef_dun01.webp";

import evilSnakeLordSprite from "../assets/sprites/1418.gif";
import gonDun03 from "../assets/maps/gon_dun03.webp";

import incantationSamuraiSprite from "../assets/sprites/1492.gif";
import amaDun03 from "../assets/maps/ama_dun03.webp";

import amonRaSprite from "../assets/sprites/1511.gif";
import mocPryd06 from "../assets/maps/moc_pryd06.webp";

import taoGunkaSprite from "../assets/sprites/1583.gif";
import beachDun from "../assets/maps/beach_dun.webp";

import rsx0806Sprite from "../assets/sprites/1623.gif";
import einDun02 from "../assets/maps/ein_dun02.webp";

import whiteLadySprite from "../assets/sprites/1630.gif";
import louDun03 from "../assets/maps/lou_dun03.webp";

import lordKnightSeyrenSprite from "../assets/sprites/1646.gif";
import assassinCrossEremesSprite from "../assets/sprites/1647.gif";
import whitesmithHowardSprite from "../assets/sprites/1648.gif";
import highPriestMargarethaSprite from "../assets/sprites/1649.gif";
import sniperCecilSprite from "../assets/sprites/1650.gif";
import highWizardKathryneSprite from "../assets/sprites/1651.gif";
import lhzDun03 from "../assets/maps/lhz_dun03.webp";

import egnigemCeniaSprite from "../assets/sprites/1658.gif";
import lhzDun02 from "../assets/maps/lhz_dun02.webp";

import vesperSprite from "../assets/sprites/1685.gif";
import jupeCore from "../assets/maps/jupe_core.webp";

import ladyTaneeSprite from "../assets/sprites/1688.gif";
import ayoDun02 from "../assets/maps/ayo_dun02.webp";

import thanatosPhantomSprite from "../assets/sprites/1708.gif";
import thanaBoss from "../assets/maps/thana_boss.webp";

import detaleSprite from "../assets/sprites/1719.gif";
import abyss03 from "../assets/maps/abyss_03.webp";

import kielD01Sprite from "../assets/sprites/1734.gif";
import khDun02 from "../assets/maps/kh_dun02.webp";

import valkyrieRandgrisSprite from "../assets/sprites/1751.gif";
import odinTem03 from "../assets/maps/odin_tem03.webp";

import boneDetardeurusSprite from "../assets/sprites/20618.gif";
import abyss04 from "../assets/maps/abyss_04.png";

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
        id: 1190,
        name: "Orc Lord",
        sprite: orcLordSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1190",
        spawns: [
            {
                map: "gef_fild10",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: gefFild10
            }
        ]
    },
    {
        id: 1251,
        name: "Stormy Knight",
        sprite: stormyKnightSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1251",
        spawns: [
            {
                map: "xmas_dun02",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 70,
                mapImage: xmasDun02
            }
        ]
    },
    {
        id: 1252,
        name: "Hatii-Garm",
        sprite: hatiiGarmSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1252",
        spawns: [
            {
                map: "xmas_fild01",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: xmasFild01
            }
        ]
    },
    {
        id: 1272,
        name: "Dark Lord",
        sprite: darkLordSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1272",
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
                respawnMin: 480,
                respawnMax: 490,
                mapImage: gldDun04_2
            }
        ]
    },
    {
        id: 1312,
        name: "Turtle General",
        sprite: turtleGeneralSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1312",
        spawns: [
            {
                map: "tur_dun04",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 70,
                mapImage: turDun04
            }
        ]
    },
    {
        id: 1389,
        name: "Dracula",
        sprite: draculaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1389",
        spawns: [
            {
                map: "gef_dun01",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 70,
                mapImage: gefDun01
            }
        ]
    },
    {
        id: 1418,
        name: "Evil Snake Lord",
        sprite: evilSnakeLordSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1418",
        spawns: [
            {
                map: "gon_dun03",
                mapType: "open_world",
                special: null,
                respawnMin: 94,
                respawnMax: 104,
                mapImage: gonDun03
            }
        ]
    },
    {
        id: 1492,
        name: "Incantation Samurai",
        sprite: incantationSamuraiSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1492",
        spawns: [
            {
                map: "ama_dun03",
                mapType: "open_world",
                special: null,
                respawnMin: 91,
                respawnMax: 101,
                mapImage: amaDun03
            }
        ]
    },
    {
        id: 1511,
        name: "Amon Ra",
        sprite: amonRaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1511",
        spawns: [
            {
                map: "moc_pryd06",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 70,
                mapImage: mocPryd06
            }
        ]
    },
    {
        id: 1583,
        name: "Tao Gunka",
        sprite: taoGunkaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1583",
        spawns: [
            {
                map: "beach_dun",
                mapType: "open_world",
                special: null,
                respawnMin: 300,
                respawnMax: 310,
                mapImage: beachDun
            }
        ]
    },
    {
        id: 1623,
        name: "RSX-0806",
        sprite: rsx0806Sprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1623",
        spawns: [
            {
                map: "ein_dun02",
                mapType: "open_world",
                special: null,
                respawnMin: 125,
                respawnMax: 135,
                mapImage: einDun02
            }
        ]
    },
    {
        id: 1630,
        name: "White Lady",
        sprite: whiteLadySprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1630",
        spawns: [
            {
                map: "lou_dun03",
                mapType: "open_world",
                special: null,
                respawnMin: 117,
                respawnMax: 127,
                mapImage: louDun03
            }
        ]
    },
    {
        id: 1646,
        name: "Lord Knight Seyren",
        sprite: lordKnightSeyrenSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1646",
        spawns: [
            {
                map: "lhz_dun03",
                mapType: "open_world",
                special: null,
                respawnMin: 100,
                respawnMax: 130,
                mapImage: lhzDun03
            }
        ]
    },
    {
        id: 1647,
        name: "Assassin Cross Eremes",
        sprite: assassinCrossEremesSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1647",
        spawns: [
            {
                map: "lhz_dun03",
                mapType: "open_world",
                special: null,
                respawnMin: 100,
                respawnMax: 130,
                mapImage: lhzDun03
            }
        ]
    },
    {
        id: 1648,
        name: "Whitesmith Howard",
        sprite: whitesmithHowardSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1648",
        spawns: [
            {
                map: "lhz_dun03",
                mapType: "open_world",
                special: null,
                respawnMin: 100,
                respawnMax: 130,
                mapImage: lhzDun03
            }
        ]
    },
    {
        id: 1649,
        name: "High Priest Margaretha",
        sprite: highPriestMargarethaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1649",
        spawns: [
            {
                map: "lhz_dun03",
                mapType: "open_world",
                special: null,
                respawnMin: 100,
                respawnMax: 130,
                mapImage: lhzDun03
            }
        ]
    },
    {
        id: 1650,
        name: "Sniper Cecil",
        sprite: sniperCecilSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1650",
        spawns: [
            {
                map: "lhz_dun03",
                mapType: "open_world",
                special: null,
                respawnMin: 100,
                respawnMax: 130,
                mapImage: lhzDun03
            }
        ]
    },
    {
        id: 1651,
        name: "High Wizard Kathryne",
        sprite: highWizardKathryneSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1651",
        spawns: [
            {
                map: "lhz_dun03",
                mapType: "open_world",
                special: null,
                respawnMin: 100,
                respawnMax: 130,
                mapImage: lhzDun03
            }
        ]
    },
    {
        id: 1658,
        name: "Egnigem Cenia",
        sprite: egnigemCeniaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1658",
        spawns: [
            {
                map: "lhz_dun02",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: lhzDun02
            }
        ]
    },
    {
        id: 1685,
        name: "Vesper",
        sprite: vesperSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1685",
        spawns: [
            {
                map: "jupe_core",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: jupeCore
            }
        ]
    },
    {
        id: 1688,
        name: "Lady Tanee",
        sprite: ladyTaneeSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1688",
        spawns: [
            {
                map: "ayo_dun02",
                mapType: "open_world",
                special: null,
                respawnMin: 420,
                respawnMax: 430,
                mapImage: ayoDun02
            }
        ]
    },
    {
        id: 1708,
        name: "Thanatos Phantom",
        sprite: thanatosPhantomSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1708",
        specialCondition: "The top of The Thanatos Tower.",
        spawns: [
            {
                map: "thana_boss",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: thanaBoss
            }
        ]
    },
    {
        id: 1719,
        name: "Detale",
        sprite: detaleSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1719",
        spawns: [
            {
                map: "abyss_03",
                mapType: "open_world",
                special: null,
                respawnMin: 180,
                respawnMax: 190,
                mapImage: abyss03
            }
        ]
    },
    {
        id: 1734,
        name: "Kiel D-01",
        sprite: kielD01Sprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1734",
        spawns: [
            {
                map: "kh_dun02",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: khDun02
            }
        ]
    },
    {
        id: 1751,
        name: "Valkyrie Randgris",
        sprite: valkyrieRandgrisSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1751",
        spawns: [
            {
                map: "odin_tem03",
                mapType: "open_world",
                special: null,
                respawnMin: 480,
                respawnMax: 490,
                mapImage: odinTem03
            }
        ]
    },
    {
        id: 20618,
        name: "Bone Detardeurus",
        sprite: boneDetardeurusSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20618",
        spawns: [
            {
                map: "abyss_04",
                mapType: "open_world",
                special: null,
                respawnMin: 180,
                respawnMax: 190,
                mapImage: abyss04
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
