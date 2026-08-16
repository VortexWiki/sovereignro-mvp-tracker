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

import gloomUnderNightSprite from "../assets/sprites/1768.gif";
import raSan05 from "../assets/maps/ra_san05.webp";

import ktullanuxSprite from "../assets/sprites/1779.gif";
import iceDun03 from "../assets/maps/ice_dun03.webp";

import atroceSprite from "../assets/sprites/1785.gif";
import gldDun03_2 from "../assets/maps/gld_dun03_2.webp";
import raFild03 from "../assets/maps/ra_fild03.webp";
import raFild04 from "../assets/maps/ra_fild04.webp";
import veFild01 from "../assets/maps/ve_fild01.webp";
import veFild02 from "../assets/maps/ve_fild02.webp";

import ifritSprite from "../assets/sprites/1832.gif";
import thorV03 from "../assets/maps/thor_v03.webp";

import fallingBishopSprite from "../assets/sprites/1871.gif";
import abbey02 from "../assets/maps/abbey02.webp";

import beelzebubSprite from "../assets/sprites/1874.gif";
import abbey03 from "../assets/maps/abbey03.png";

import gopinichSprite from "../assets/sprites/1885.gif";
import moskDun03 from "../assets/maps/mosk_dun03.webp";

import woundedMoroccSprite from "../assets/sprites/1917.gif";
import mocFild22 from "../assets/maps/moc_fild22.webp";

import naghtSiegerSprite from "../assets/sprites/1956.gif";
import tower6 from "../assets/maps/6@tower.webp";

import entweihenCrothenSprite from "../assets/sprites/1957.gif";
import tower5 from "../assets/maps/5@tower.webp";

import nidhoggrsShadowSprite from "../assets/sprites/2022.gif";
import nyd2 from "../assets/maps/2@nyd.webp";

import boitataSprite from "../assets/sprites/2068.gif";
import braDun02 from "../assets/maps/bra_dun02.webp";

import queenScarabaSprite from "../assets/sprites/2087.gif";
import dicDun02 from "../assets/maps/dic_dun02.webp";

import lostDragonSprite from "../assets/sprites/2131.gif";
import mist1 from "../assets/maps/1@mist.webp";

import leakSprite from "../assets/sprites/2156.gif";
import dewDun01 from "../assets/maps/dew_dun01.webp";

import goldQueenScarabaSprite from "../assets/sprites/2165.gif";
import dicDun03 from "../assets/maps/dic_dun03.webp";

import darkCoelacanthSprite from "../assets/sprites/2187.gif";
import pump1 from "../assets/maps/1@pump.webp";

import giantOctopusSprite from "../assets/sprites/2194.gif";
import cash1 from "../assets/maps/1@cash.webp";

import krakenSprite from "../assets/sprites/2202.gif";
import izDun05 from "../assets/maps/iz_dun05.webp";

import paladinRandelSprite from "../assets/sprites/2235.gif";
import creatorFlamelSprite from "../assets/sprites/2236.gif";
import professorCeliaSprite from "../assets/sprites/2237.gif";
import championChenSprite from "../assets/sprites/2238.gif";
import stalkerGertieSprite from "../assets/sprites/2239.gif";
import clownAlphoccioSprite from "../assets/sprites/2240.gif";
import gypsyTrentiniSprite from "../assets/sprites/2241.gif";
import lhzDun04 from "../assets/maps/lhz_dun04.webp";

import pyurielSprite from "../assets/sprites/2249.gif";
import gld2Prt from "../assets/maps/gld2_prt.webp";

import gioiaSprite from "../assets/sprites/2251.gif";
import gld2Ald from "../assets/maps/gld2_ald.webp";

import elviraSprite from "../assets/sprites/2252.gif";

import daehyonSprite from "../assets/sprites/2253.gif";
import gld2Pay from "../assets/maps/gld2_pay.webp";

import soheonSprite from "../assets/sprites/2254.gif";

import kadesSprite from "../assets/sprites/2255.gif";
import gld2Gef from "../assets/maps/gld2_gef.webp";

import rudoSprite from "../assets/sprites/2256.gif";

import buwayaSprite from "../assets/sprites/2319.gif";
import maC1 from "../assets/maps/1@ma_c.webp";

import bangungotSprite from "../assets/sprites/2327.gif";
import maH1 from "../assets/maps/1@ma_h.webp";

import amonRaNightmareSprite from "../assets/sprites/2362.gif";
import mocPrydn2 from "../assets/maps/moc_prydn2.webp";

import theLastOneSprite from "../assets/sprites/2441.gif";
import tegDun01 from "../assets/maps/teg_dun01.webp";

import kingOfTheAlleySprite from "../assets/sprites/2442.gif";
import tegDun02 from "../assets/maps/teg_dun02.webp";

import corruptedSoulSprite from "../assets/sprites/2475.gif";
import glK1 from "../assets/maps/1@gl_k.webp";

import amdaraisSprite from "../assets/sprites/2476.gif";
import glK2 from "../assets/maps/2@gl_k.webp";

import baphometNightmareSprite from "../assets/sprites/2483.gif";
import glCas02_ from "../assets/maps/gl_cas02_.webp";

import facewormQueenSprite from "../assets/sprites/2529.gif";
import face1 from "../assets/maps/1@face.webp";

import geffenFenrirSprite from "../assets/sprites/2564.gif";
import geSt1 from "../assets/maps/1@ge_st.webp";

import evilFanaticsSprite from "../assets/sprites/2942.gif";
import tnm3_1 from "../assets/maps/1@tnm3.webp";

import shiningTeddyBearSprite from "../assets/sprites/20260.gif";
import einDun02b from "../assets/maps/ein_dun02.webp";

import ancientTaoGunkaSprite from "../assets/sprites/20273.gif";
import comD02_i from "../assets/maps/com_d02_i.webp";

import ancientWootanDefenderSprite from "../assets/sprites/20277.gif";

import el1A17TSprite from "../assets/sprites/20340.gif";
import cor1 from "../assets/maps/1@cor.webp";

import miguelSprite from "../assets/sprites/20346.gif";
import osA1 from "../assets/maps/1@os_a.webp";

import r4885BestiaSprite from "../assets/sprites/20381.gif";
import spRudus2 from "../assets/maps/sp_rudus2.webp";

import rigidMuspellskollSprite from "../assets/sprites/20419.gif";
import magDun03 from "../assets/maps/mag_dun03.webp";

import corruptedSpiderQueenSprite from "../assets/sprites/20421.gif";
import glCas01_ from "../assets/maps/gl_cas01_.webp";

import corruptedDarkLordSprite from "../assets/sprites/20422.gif";

import jewelUngoliantSprite from "../assets/sprites/20601.gif";
import einDun03 from "../assets/maps/ein_dun03.webp";

import redPepperSprite from "../assets/sprites/20620.gif";
import herbs1 from "../assets/maps/1@herbs.webp";

import seniorRedPepperSprite from "../assets/sprites/20621.gif";

import sweetySprite from "../assets/sprites/20642.gif";
import bamq1 from "../assets/maps/1@bamq.webp";

import bossMeowSprite from "../assets/sprites/20648.gif";
import baLost from "../assets/maps/ba_lost.webp";

import pitayaBossSprite from "../assets/sprites/20659.gif";
import lost1 from "../assets/maps/1@lost.webp";

import silvaPapiliaSprite from "../assets/sprites/20667.gif";
import ghg1 from "../assets/maps/1@ghg.webp";

import granPapiliaSprite from "../assets/sprites/20668.gif";

import deepSeaKrakenSprite from "../assets/sprites/20811.gif";
import izD04_i from "../assets/maps/iz_d04_i.webp";

import deepSeaWitchSprite from "../assets/sprites/20843.gif";
import izD05_i from "../assets/maps/iz_d05_i.webp";

import theOneSprite from "../assets/sprites/20928.gif";
import amicitia2 from "../assets/maps/amicitia2.webp";

import r001BestiaSprite from "../assets/sprites/20934.gif";
import spRudus4 from "../assets/maps/sp_rudus4.webp";

import deathWitchSprite from "../assets/sprites/20943.gif";
import nifDun02 from "../assets/maps/nif_dun02.webp";

import burningFangSprite from "../assets/sprites/21301.gif";
import ozDun02 from "../assets/maps/oz_dun02.webp";

import silentMayaSprite from "../assets/sprites/21395.gif";
import antD02_i from "../assets/maps/ant_d02_i.webp";

import stefanJEWolfSprite from "../assets/sprites/3473.gif";
import sthd1 from "../assets/maps/1@sthd.webp";

import bigEggringSprite from "../assets/sprites/3505.gif";
import lasaDun01 from "../assets/maps/lasa_dun01.webp";

import cutieSprite from "../assets/sprites/3621.gif";
import slabw01 from "../assets/maps/slabw01.webp";

import heartHunterEbelSprite from "../assets/sprites/3628.gif";
import swat1 from "../assets/maps/1@swat.webp";

import venomousChimeraSprite from "../assets/sprites/3633.gif";

import lichLordSprite from "../assets/sprites/3658.gif";
import mdGef1 from "../assets/maps/1@md_gef.webp";

import lichLordHardSprite from "../assets/sprites/3659.gif";

import mechaspiderSprite from "../assets/sprites/3741.gif";
import rockmi1 from "../assets/maps/rockmi1.webp";

import draculaOfRageSprite from "../assets/sprites/3757.gif";
import gefD01_i from "../assets/maps/gef_d01_i.webp";

import angryMoonlightFlowerSprite from "../assets/sprites/3758.gif";
import payD03_i from "../assets/maps/pay_d03_i.webp";

import awakenedKtullanuxSprite from "../assets/sprites/3796.gif";
import iceD03_i from "../assets/maps/ice_d03_i.webp";

import ominousTurtleGeneralSprite from "../assets/sprites/3804.gif";
import turD04_i from "../assets/maps/tur_d04_i.webp";

import kingPoringSprite from "../assets/sprites/3810.gif";
import begi1 from "../assets/maps/1@begi.webp";

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
        id: 1768,
        name: "Gloom Under Night",
        sprite: gloomUnderNightSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1768",
        spawns: [
            {
                map: "ra_san05",
                mapType: "open_world",
                special: null,
                respawnMin: 300,
                respawnMax: 310,
                mapImage: raSan05
            }
        ]
    },
    {
        id: 1779,
        name: "Ktullanux",
        sprite: ktullanuxSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1779",
        specialCondition: "Ice Necklace Quest: https://irowiki.org/wiki/Ice_Necklace_Quest",
        spawns: [
            {
                map: "ice_dun03",
                mapType: "open_world",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: iceDun03
            }
        ]
    },
    {
        id: 1785,
        name: "Atroce",
        sprite: atroceSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1785",
        spawns: [
            {
                map: "gld_dun03_2",
                mapType: "open_world",
                special: null,
                respawnMin: 480,
                respawnMax: 490,
                mapImage: gldDun03_2
            },
            {
                map: "ra_fild03",
                mapType: "open_world",
                special: null,
                respawnMin: 180,
                respawnMax: 190,
                mapImage: raFild03
            },
            {
                map: "ra_fild04",
                mapType: "open_world",
                special: null,
                respawnMin: 300,
                respawnMax: 310,
                mapImage: raFild04
            },
            {
                map: "ve_fild01",
                mapType: "open_world",
                special: null,
                respawnMin: 180,
                respawnMax: 190,
                mapImage: veFild01
            },
            {
                map: "ve_fild02",
                mapType: "open_world",
                special: null,
                respawnMin: 360,
                respawnMax: 370,
                mapImage: veFild02
            }
        ]
    },
    {
        id: 1832,
        name: "Ifrit",
        sprite: ifritSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1832",
        spawns: [
            {
                map: "thor_v03",
                mapType: "open_world",
                special: null,
                respawnMin: 660,
                respawnMax: 670,
                mapImage: thorV03
            }
        ]
    },
    {
        id: 1871,
        name: "Falling Bishop",
        sprite: fallingBishopSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1871",
        spawns: [
            {
                map: "abbey02",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: abbey02
            }
        ]
    },
    {
        id: 1874,
        name: "Beelzebub",
        sprite: beelzebubSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1874",
        specialCondition: "Beelzebub (Fly Form) must transform into Phase 2.",
        spawns: [
            {
                map: "abbey03",
                mapType: "open_world",
                special: null,
                respawnMin: 720,
                respawnMax: 730,
                mapImage: abbey03
            }
        ]
    },
    {
        id: 1885,
        name: "Gopinich",
        sprite: gopinichSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1885",
        spawns: [
            {
                map: "mosk_dun03",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: moskDun03
            }
        ]
    },
    {
        id: 1917,
        name: "Wounded Morocc",
        sprite: woundedMoroccSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1917",
        spawns: [
            {
                map: "moc_fild22",
                mapType: "open_world",
                special: null,
                respawnMin: 720,
                respawnMax: 730,
                mapImage: mocFild22
            }
        ]
    },
    {
        id: 1956,
        name: "Naght Sieger",
        sprite: naghtSiegerSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1956",
        specialCondition: "Endless Tower final boss",
        spawns: [
            {
                map: "6@tower",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: tower6
            }
        ]
    },
    {
        id: 1957,
        name: "Entweihen Crothen",
        sprite: entweihenCrothenSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1957",
        specialCondition: "Endless Tower boss",
        spawns: [
            {
                map: "5@tower",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: tower5
            }
        ]
    },
    {
        id: 2022,
        name: "Nidhoggr's Shadow",
        sprite: nidhoggrsShadowSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2022",
        specialCondition: "Nidhoggur's Nest (Level 2) Instance Map",
        spawns: [
            {
                map: "2@nyd",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: nyd2
            }
        ]
    },
    {
        id: 2068,
        name: "Boitata",
        sprite: boitataSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2068",
        spawns: [
            {
                map: "bra_dun02",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: braDun02
            }
        ]
    },
    {
        id: 2087,
        name: "Queen Scaraba",
        sprite: queenScarabaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2087",
        spawns: [
            {
                map: "dic_dun02",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: dicDun02
            }
        ]
    },
    {
        id: 2131,
        name: "Lost Dragon",
        sprite: lostDragonSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2131",
        specialCondition: "The Hazy Maze Forest  Instance Map",
        spawns: [
            {
                map: "1@mist",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: mist1
            }
        ]
    },
    {
        id: 2156,
        name: "Leak",
        sprite: leakSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2156",
        spawns: [
            {
                map: "dew_dun01",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: dewDun01
            }
        ]
    },
    {
        id: 2165,
        name: "Gold Queen Scaraba",
        sprite: goldQueenScarabaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2165",
        specialCondition: "Quest needed Hall's admission requires Scaraba Perfume. Curious Sapha (dic_dun01 266/113) sell perfume in Kamidal Tunnel.\nEntrance gatekeeper are Dirty Vigilante (dic_dun0 284/102), he stay next to gatekeeper of normal scaraba.",
        spawns: [
            {
                map: "dic_dun03",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: dicDun03
            }
        ]
    },
    {
        id: 2187,
        name: "Dark Coelacanth",
        sprite: darkCoelacanthSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2187",
        specialCondition: "Drain 1 (1@pump)\n*Instance Map",
        spawns: [
            {
                map: "1@pump",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: pump1
            }
        ]
    },
    {
        id: 2194,
        name: "Giant Octopus",
        sprite: giantOctopusSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2194",
        specialCondition: "Octopus Cave (1@cash)\n*Instance Map",
        spawns: [
            {
                map: "1@cash",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: cash1
            }
        ]
    },
    {
        id: 2202,
        name: "Kraken",
        sprite: krakenSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2202",
        spawns: [
            {
                map: "iz_dun05",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 150,
                mapImage: izDun05
            }
        ]
    },
    {
        id: 2235,
        name: "Paladin Randel",
        sprite: paladinRandelSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2235",
        spawns: [
            {
                map: "lhz_dun04",
                mapType: "open_world",
                special: null,
                respawnMin: 100,
                respawnMax: 130,
                mapImage: lhzDun04
            }
        ]
    },
    {
        id: 2236,
        name: "Creator Flamel",
        sprite: creatorFlamelSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2236",
        spawns: [
            {
                map: "lhz_dun04",
                mapType: "open_world",
                special: null,
                respawnMin: 100,
                respawnMax: 130,
                mapImage: lhzDun04
            }
        ]
    },
    {
        id: 2237,
        name: "Professor Celia",
        sprite: professorCeliaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2237",
        spawns: [
            {
                map: "lhz_dun04",
                mapType: "open_world",
                special: null,
                respawnMin: 100,
                respawnMax: 130,
                mapImage: lhzDun04
            }
        ]
    },
    {
        id: 2238,
        name: "Champion Chen",
        sprite: championChenSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2238",
        spawns: [
            {
                map: "lhz_dun04",
                mapType: "open_world",
                special: null,
                respawnMin: 100,
                respawnMax: 130,
                mapImage: lhzDun04
            }
        ]
    },
    {
        id: 2239,
        name: "Stalker Gertie",
        sprite: stalkerGertieSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2239",
        spawns: [
            {
                map: "lhz_dun04",
                mapType: "open_world",
                special: null,
                respawnMin: 100,
                respawnMax: 130,
                mapImage: lhzDun04
            }
        ]
    },
    {
        id: 2240,
        name: "Clown Alphoccio",
        sprite: clownAlphoccioSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2240",
        spawns: [
            {
                map: "lhz_dun04",
                mapType: "open_world",
                special: null,
                respawnMin: 100,
                respawnMax: 130,
                mapImage: lhzDun04
            }
        ]
    },
    {
        id: 2241,
        name: "Gypsy Trentini",
        sprite: gypsyTrentiniSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2241",
        spawns: [
            {
                map: "lhz_dun04",
                mapType: "open_world",
                special: null,
                respawnMin: 100,
                respawnMax: 130,
                mapImage: lhzDun04
            }
        ]
    },
    {
        id: 2249,
        name: "Pyuriel",
        sprite: pyurielSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2249",
        specialCondition: "Hall of the Abyss : Warrior road",
        spawns: [
            {
                map: "gld2_prt",
                mapType: "open_world",
                special: null,
                respawnMin: 480,
                respawnMax: 490,
                mapImage: gld2Prt
            }
        ]
    },
    {
        id: 2251,
        name: "Gioia",
        sprite: gioiaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2251",
        specialCondition: "Hall of the Abyss : Tear of Hero",
        spawns: [
            {
                map: "gld2_ald",
                mapType: "open_world",
                special: null,
                respawnMin: 480,
                respawnMax: 490,
                mapImage: gld2Ald
            }
        ]
    },
    {
        id: 2252,
        name: "Elvira",
        sprite: elviraSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2252",
        specialCondition: "Hall of the Abyss : Tear of Hero",
        spawns: [
            {
                map: "gld2_ald",
                mapType: "open_world",
                special: null,
                respawnMin: 30,
                respawnMax: 40,
                mapImage: gld2Ald
            }
        ]
    },
    {
        id: 2253,
        name: "Daehyon",
        sprite: daehyonSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2253",
        specialCondition: "Hall of the Abyss : Wind of beginning",
        spawns: [
            {
                map: "gld2_pay",
                mapType: "open_world",
                special: null,
                respawnMin: 480,
                respawnMax: 490,
                mapImage: gld2Pay
            }
        ]
    },
    {
        id: 2254,
        name: "Soheon",
        sprite: soheonSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2254",
        specialCondition: "Hall of the Abyss : Wind of beginning",
        spawns: [
            {
                map: "gld2_pay",
                mapType: "open_world",
                special: null,
                respawnMin: 30,
                respawnMax: 40,
                mapImage: gld2Pay
            }
        ]
    },
    {
        id: 2255,
        name: "Kades",
        sprite: kadesSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2255",
        specialCondition: "Hall of the Abyss : Hill of death",
        spawns: [
            {
                map: "gld2_gef",
                mapType: "open_world",
                special: null,
                respawnMin: 480,
                respawnMax: 490,
                mapImage: gld2Gef
            }
        ]
    },
    {
        id: 2256,
        name: "Rudo",
        sprite: rudoSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2256",
        specialCondition: "Hall of the Abyss : Hill of death",
        spawns: [
            {
                map: "gld2_gef",
                mapType: "open_world",
                special: null,
                respawnMin: 30,
                respawnMax: 40,
                mapImage: gld2Gef
            }
        ]
    },
    {
        id: 2319,
        name: "Buwaya",
        sprite: buwayaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2319",
        specialCondition: "Buwaya Cave (1@ma_c)\n*Instance Map",
        spawns: [
            {
                map: "1@ma_c",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: maC1
            }
        ]
    },
    {
        id: 2327,
        name: "Bangungot",
        sprite: bangungotSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2327",
        specialCondition: "Malaya Bangungot Hospital 2F (1@ma_h)\n*Instance Map",
        spawns: [
            {
                map: "1@ma_h",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: maH1
            }
        ]
    },
    {
        id: 2362,
        name: "Amon Ra (Nightmare)",
        sprite: amonRaNightmareSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2362",
        spawns: [
            {
                map: "moc_prydn2",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 70,
                mapImage: mocPrydn2
            }
        ]
    },
    {
        id: 2441,
        name: "The Last One",
        sprite: theLastOneSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2441",
        specialCondition: "TE Subterranean Guild Dungeon",
        spawns: [
            {
                map: "teg_dun01",
                mapType: "open_world",
                special: null,
                respawnMin: 480,
                respawnMax: 480,
                mapImage: tegDun01
            }
        ]
    },
    {
        id: 2442,
        name: "King of the Alley",
        sprite: kingOfTheAlleySprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2442",
        specialCondition: "TE Subterranean Guild Dungeon",
        spawns: [
            {
                map: "teg_dun02",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 120,
                mapImage: tegDun02
            }
        ]
    },
    {
        id: 2475,
        name: "Corrupted Soul",
        sprite: corruptedSoulSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2475",
        specialCondition: "Old Glast Heim Chivalry 2F (1@gl_k)\n*Instance Map",
        spawns: [
            {
                map: "1@gl_k",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: glK1
            }
        ]
    },
    {
        id: 2476,
        name: "Amdarais",
        sprite: amdaraisSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2476",
        specialCondition: "Old Glast Heim Chivalry 1F (2@gl_k)\n*Instance Map",
        spawns: [
            {
                map: "2@gl_k",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: glK2
            }
        ]
    },
    {
        id: 2483,
        name: "Baphomet (Nightmare)",
        sprite: baphometNightmareSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2483",
        spawns: [
            {
                map: "gl_cas02_",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 120,
                mapImage: glCas02_
            }
        ]
    },
    {
        id: 2529,
        name: "Faceworm Queen",
        sprite: facewormQueenSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2529",
        specialCondition: "Faceworm's Nest (1@face)\n*Instance Map",
        spawns: [
            {
                map: "1@face",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: face1
            }
        ]
    },
    {
        id: 2564,
        name: "Geffen Fenrir",
        sprite: geffenFenrirSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2564",
        specialCondition: "Geffen Magic Tournament (1@ge_st)\n*Instance Map",
        spawns: [
            {
                map: "1@ge_st",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: geSt1
            }
        ]
    },
    {
        id: 2942,
        name: "Evil Fanatics",
        sprite: evilFanaticsSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/2942",
        specialCondition: "Morroc Castle - Basement (1@tnm3)\n*Instance Map",
        spawns: [
            {
                map: "1@tnm3",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: tnm3_1
            }
        ]
    },
    {
        id: 20260,
        name: "Shining Teddy Bear",
        sprite: shiningTeddyBearSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20260",
        specialCondition: "Spawn after defeating 2500 Teddy Bears on map.",
        spawns: [
            {
                map: "ein_dun02",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 120,
                mapImage: einDun02b
            }
        ]
    },
    {
        id: 20273,
        name: "Ancient Tao Gunka",
        sprite: ancientTaoGunkaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20273",
        specialCondition: "Spawn after defeating 1500 mobs on map.",
        spawns: [
            {
                map: "com_d02_i",
                mapType: "instance",
                special: null,
                respawnMin: 120,
                respawnMax: 120,
                mapImage: comD02_i
            }
        ]
    },
    {
        id: 20277,
        name: "Ancient Wootan Defender",
        sprite: ancientWootanDefenderSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20277",
        specialCondition: "Spawn after defeating 1500 mobs on map.",
        spawns: [
            {
                map: "com_d02_i",
                mapType: "instance",
                special: null,
                respawnMin: 120,
                respawnMax: 120,
                mapImage: comD02_i
            }
        ]
    },
    {
        id: 20340,
        name: "EL1-A17T",
        sprite: el1A17TSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20340",
        specialCondition: "Cor Memorial (1@cor)\n*Instance Map",
        spawns: [
            {
                map: "1@cor",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: cor1
            }
        ]
    },
    {
        id: 20346,
        name: "Miguel",
        sprite: miguelSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20346",
        specialCondition: "Os Occupation (1@os_a)\n*Instance Map",
        spawns: [
            {
                map: "1@os_a",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: osA1
            }
        ]
    },
    {
        id: 20381,
        name: "R48-85-Bestia",
        sprite: r4885BestiaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20381",
        spawns: [
            {
                map: "sp_rudus2",
                mapType: "open_world",
                special: null,
                respawnMin: 360,
                respawnMax: 370,
                mapImage: spRudus2
            }
        ]
    },
    {
        id: 20419,
        name: "Rigid Muspellskoll",
        sprite: rigidMuspellskollSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20419",
        spawns: [
            {
                map: "mag_dun03",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 70,
                mapImage: magDun03
            }
        ]
    },
    {
        id: 20421,
        name: "Corrupted Spider Queen",
        sprite: corruptedSpiderQueenSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20421",
        spawns: [
            {
                map: "gl_cas01_",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: glCas01_
            }
        ]
    },
    {
        id: 20422,
        name: "Corrupted Dark Lord",
        sprite: corruptedDarkLordSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20422",
        spawns: [
            {
                map: "gl_cas01_",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 70,
                mapImage: glCas01_
            }
        ]
    },
    {
        id: 20601,
        name: "Jewel Ungoliant",
        sprite: jewelUngoliantSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20601",
        spawns: [
            {
                map: "ein_dun03",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: einDun03
            }
        ]
    },
    {
        id: 20620,
        name: "Red Pepper",
        sprite: redPepperSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20620",
        specialCondition: "Hidden Flower Garden (1@herbs)\n*Instance Map",
        spawns: [
            {
                map: "1@herbs",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: herbs1
            }
        ]
    },
    {
        id: 20621,
        name: "Senior Red Pepper",
        sprite: seniorRedPepperSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20621",
        specialCondition: "Hidden Garden - Hard Mode (1@herbs(hard))\n*Instance Map",
        spawns: [
            {
                map: "1@herbs",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: herbs1
            }
        ]
    },
    {
        id: 20642,
        name: "Sweety",
        sprite: sweetySprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20642",
        specialCondition: "Twilight Garden - Unfair Dock (1@bamq)\n*Instance Map",
        spawns: [
            {
                map: "1@bamq",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: bamq1
            }
        ]
    },
    {
        id: 20648,
        name: "Boss Meow",
        sprite: bossMeowSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20648",
        spawns: [
            {
                map: "ba_lost",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: baLost
            }
        ]
    },
    {
        id: 20659,
        name: "Pitaya Boss",
        sprite: pitayaBossSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20659",
        specialCondition: "Farm of Forgotten Time (1@lost)\n*Instance Map",
        spawns: [
            {
                map: "1@lost",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: lost1
            }
        ]
    },
    {
        id: 20667,
        name: "Silva Papilia",
        sprite: silvaPapiliaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20667",
        specialCondition: "Water Garden - Orthos Aqua (1@ghg)",
        spawns: [
            {
                map: "1@ghg",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: ghg1
            }
        ]
    },
    {
        id: 20668,
        name: "Gran Papilia",
        sprite: granPapiliaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20668",
        specialCondition: "Water Garden - Hard Mode (1@ghg(hard))\n*Instance Map",
        spawns: [
            {
                map: "1@ghg",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: ghg1
            }
        ]
    },
    {
        id: 20811,
        name: "Deep Sea Kraken",
        sprite: deepSeaKrakenSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20811",
        specialCondition: "Spawn after defeating 1500 mobs on map.",
        spawns: [
            {
                map: "iz_d04_i",
                mapType: "instance",
                special: null,
                respawnMin: 120,
                respawnMax: 120,
                mapImage: izD04_i
            }
        ]
    },
    {
        id: 20843,
        name: "Deep Sea Witch",
        sprite: deepSeaWitchSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20843",
        specialCondition: "Spawn after defeating 1500 mobs on map.",
        spawns: [
            {
                map: "iz_d05_i",
                mapType: "instance",
                special: null,
                respawnMin: 120,
                respawnMax: 120,
                mapImage: izD05_i
            }
        ]
    },
    {
        id: 20928,
        name: "The One",
        sprite: theOneSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20928",
        spawns: [
            {
                map: "amicitia2",
                mapType: "open_world",
                special: null,
                respawnMin: 360,
                respawnMax: 370,
                mapImage: amicitia2
            }
        ]
    },
    {
        id: 20934,
        name: "R001-Bestia",
        sprite: r001BestiaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20934",
        spawns: [
            {
                map: "sp_rudus4",
                mapType: "open_world",
                special: null,
                respawnMin: 360,
                respawnMax: 370,
                mapImage: spRudus4
            }
        ]
    },
    {
        id: 20943,
        name: "Death Witch",
        sprite: deathWitchSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/20943",
        spawns: [
            {
                map: "nif_dun02",
                mapType: "open_world",
                special: null,
                respawnMin: 360,
                respawnMax: 370,
                mapImage: nifDun02
            }
        ]
    },
    {
        id: 21301,
        name: "Burning Fang",
        sprite: burningFangSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/21301",
        spawns: [
            {
                map: "oz_dun02",
                mapType: "open_world",
                special: null,
                respawnMin: 360,
                respawnMax: 370,
                mapImage: ozDun02
            }
        ]
    },
    {
        id: 21395,
        name: "Silent Maya",
        sprite: silentMayaSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/21395",
        specialCondition: "Spawn after defeating 3000 mobs on map.",
        spawns: [
            {
                map: "ant_d02_i",
                mapType: "instance",
                special: null,
                respawnMin: 120,
                respawnMax: 120,
                mapImage: antD02_i
            }
        ]
    },
    {
        id: 3473,
        name: "Stefan.J.E.Wolf",
        sprite: stefanJEWolfSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/3473",
        specialCondition: "Aerial Fortress Top Floor (1@sthd)\n*Instance Map",
        spawns: [
            {
                map: "1@sthd",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: sthd1
            }
        ]
    },
    {
        id: 3505,
        name: "Big Eggring",
        sprite: bigEggringSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/3505",
        spawns: [
            {
                map: "lasa_dun01",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 70,
                mapImage: lasaDun01
            }
        ]
    },
    {
        id: 3621,
        name: "Cutie",
        sprite: cutieSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/3621",
        specialCondition: "Werner's Laboratory quest",
        spawns: [
            {
                map: "slabw01",
                mapType: "open_world",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: slabw01
            }
        ]
    },
    {
        id: 3628,
        name: "Heart Hunter Ebel",
        sprite: heartHunterEbelSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/3628",
        specialCondition: "Heart Hunter War Base (1@swat)\n*Instance Map",
        spawns: [
            {
                map: "1@swat",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: swat1
            }
        ]
    },
    {
        id: 3633,
        name: "Venomous Chimera",
        sprite: venomousChimeraSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/3633",
        spawns: [
            {
                map: "slabw01",
                mapType: "open_world",
                special: null,
                respawnMin: 60,
                respawnMax: 70,
                mapImage: slabw01
            }
        ]
    },
    {
        id: 3658,
        name: "Lich Lord",
        sprite: lichLordSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/3658",
        specialCondition: "Friday Memorial (1@md_gef)\n*Instance Map",
        spawns: [
            {
                map: "1@md_gef",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: mdGef1
            }
        ]
    },
    {
        id: 3659,
        name: "Lich Lord (hard)",
        sprite: lichLordHardSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/3659",
        specialCondition: "Friday Memorial - Hard Mode (1@md_gef(hard))\n*Instance Map",
        spawns: [
            {
                map: "1@md_gef",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: mdGef1
            }
        ]
    },
    {
        id: 3741,
        name: "Mechaspider",
        sprite: mechaspiderSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/3741",
        spawns: [
            {
                map: "rockmi1",
                mapType: "open_world",
                special: null,
                respawnMin: 120,
                respawnMax: 130,
                mapImage: rockmi1
            }
        ]
    },
    {
        id: 3757,
        name: "Dracula of Rage",
        sprite: draculaOfRageSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/3757",
        specialCondition: "Spawn after defeating Bomi.",
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
        id: 3758,
        name: "Angry Moonlight Flower",
        sprite: angryMoonlightFlowerSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/3758",
        specialCondition: "10% chance to spawn after defeating 1000 Angry Nine Tail.",
        spawns: [
            {
                map: "pay_d03_i",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: payD03_i
            }
        ]
    },
    {
        id: 3796,
        name: "Awakened Ktullanux",
        sprite: awakenedKtullanuxSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/3796",
        specialCondition: "Spawn after unlocking 4 Crystal Seals on map.",
        spawns: [
            {
                map: "ice_d03_i",
                mapType: "instance",
                special: null,
                respawnMin: 120,
                respawnMax: 120,
                mapImage: iceD03_i
            }
        ]
    },
    {
        id: 3804,
        name: "Ominous Turtle General",
        sprite: ominousTurtleGeneralSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/3804",
        specialCondition: "Spawn after defeating 2500 of the same mob on map.",
        spawns: [
            {
                map: "tur_d04_i",
                mapType: "instance",
                special: null,
                respawnMin: 120,
                respawnMax: 120,
                mapImage: turD04_i
            }
        ]
    },
    {
        id: 3810,
        name: "King Poring",
        sprite: kingPoringSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/3810",
        specialCondition: "Poring Village (Beginner Instance) (1@begi)\n*Instance Map",
        spawns: [
            {
                map: "1@begi",
                mapType: "instance",
                special: null,
                respawnMin: null,
                respawnMax: null,
                mapImage: begi1
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
