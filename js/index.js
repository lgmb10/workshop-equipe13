import idle from "../sprites/player/idle.mjs";
import walk from "../sprites/player/walk.mjs";
import run from "../sprites/player/run.mjs";
import hurt from "../sprites/player/hurt.mjs";
import death from "../sprites/player/death.mjs";
import { animate, clear } from "./sprite.mjs";

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var posIdle = 1;
var posWalk = 1;
var posRun = 1;
var posHurt = 1;
var posDeath = 1;

function game() {
    clear(canvas,context);
    posIdle >= idle.length && (posIdle = 0);
    animate(posIdle,idle,{x:0,y:10},context);
    posWalk >= walk.length && (posWalk = 0);
    animate(posWalk,walk,{x:50,y:10},context);
    posRun >= run.length && (posRun = 0);
    animate(posRun,run,{x:100,y:10},context);
    posHurt >= hurt.length && (posHurt = 0);
    animate(posHurt,hurt,{x:150,y:10},context);
    posDeath >= death.length && (posDeath = 0);
    animate(posDeath,death,{x:200,y:10},context);

    posIdle++;
    posWalk++;
    posRun++;
    posHurt++;
    posDeath++;
}

setInterval(() => {
    game();
}, 120);