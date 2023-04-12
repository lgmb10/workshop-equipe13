import idle from "../sprites/player/idle.mjs";
import walk from "../sprites/player/walk.mjs";
import run from "../sprites/player/run.mjs";
import hurt from "../sprites/player/hurt.mjs";
import death from "../sprites/player/death.mjs";
import { animate, clear } from "./sprite.mjs";

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
context.fillStyle = 'white'

var posIdle = 1;
var posWalk = 1;
var posRun = 1;
var posHurt = 1;
var posDeath = 1;
var playerSizeMultiplier = 2.5

function player() {
    posIdle >= idle.length && (posIdle = 0);
    animate(posIdle,idle,{x:0,y:100},context,playerSizeMultiplier);
    posWalk >= walk.length && (posWalk = 0);
    animate(posWalk,walk,{x:100,y:100},context,playerSizeMultiplier);
    posRun >= run.length && (posRun = 0);
    animate(posRun,run,{x:200,y:100},context,playerSizeMultiplier);
    posHurt >= hurt.length && (posHurt = 0);
    animate(posHurt,hurt,{x:300,y:100},context,playerSizeMultiplier);
    posDeath >= death.length && (posDeath = 0);
    animate(posDeath,death,{x:400,y:100},context,playerSizeMultiplier);
}

var backSpeed = 2;
var backImg = new Image();
backImg.src = "../images/background/City1.png";
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

function handleBackGround() {
    if (BG.x1 <= -BG.width + backSpeed) BG.x1 = BG.width;
    else BG.x1 -= backSpeed;
    if (BG.x2 <= -BG.width + backSpeed) BG.x2 = BG.width;
    else BG.x2 -= backSpeed;
    context.drawImage(backImg, BG.x1, BG.y, BG.width, BG.height);
    context.drawImage(backImg, BG.x2, BG.y, BG.width, BG.height)
}

setInterval(() => {
    posIdle++;
    posWalk++;
    posRun++;
    posHurt++;
    posDeath++;
}, 120);

function game() {
    clear(canvas,context);

    handleBackGround();
    player();
}

setInterval(() => {
    game();
}, 20);

