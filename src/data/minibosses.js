// Mini-boss data, same structure and sourcing method as mvps.js
// (validated one by one against Divine-Pride screenshots).
//
// See mvps.js for the full structure comment.

import angelingSprite from "../assets/sprites/1096.gif";
import payFild04 from "../assets/maps/pay_fild04.webp";
import xmasDun01 from "../assets/maps/xmas_dun01.webp";
import yunoFild03 from "../assets/maps/yuno_fild03.webp";

const minibosses = [
    {
        id: 1096,
        name: "Angeling",
        sprite: angelingSprite,
        divinePrideUrl: "https://www.divine-pride.net/database/monster/1096/angeling",
        cardEffect: "The user's property becomes **Level 1 Holy**.",
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
    }
];

export default minibosses;
