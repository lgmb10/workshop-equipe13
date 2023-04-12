import idle from "../sprites/player/idle.mjs";
import walk from "../sprites/player/walk.mjs";
import run from "../sprites/player/run.mjs";
import hurt from "../sprites/player/hurt.mjs";
import death from "../sprites/player/death.mjs";
import BACKGROUND from "../sprites/background.mjs";
import { animate, clear, handleBackGround } from "./sprite.mjs";
import { createItem, drawItem, isColision } from "./item.mjs";

const gameArea = document.querySelector('.game-area');
const hearts = document.querySelectorAll(".heart");
const scoreDiv = document.querySelector(".score");
const pauseInfo = document.querySelector('#pause');
let ingameMessage = document.querySelector(".ingame-message");


let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
context.fillStyle = 'white'

let score = 0;
let posIdle = 1;
let posWalk = 1;
let posRun = 1;
let posHurt = 1;
let posDeath = 1;
let playerSizeMultiplier = 2.5
let gameSpeed = 4;
let time = 0.0;
let gameOnGoing = false;
let isAlive = true;
let isHurt = false;
let itemsList = [];
let health = 3;
let playerPeace = "idle";
let slowed = false;
let slowedValue = 0;
let slowStartTime = 0;

function handlePlayer() {
    if (!gameOnGoing) {
        if (isAlive) {
            posIdle >= idle.length && (posIdle = 0);
            animate(posIdle, idle, { x: 50, y: 100 }, context, playerSizeMultiplier);
        } else {
            posDeath >= death.length && (posDeath = death.length - 1);
            animate(posDeath, death, { x: 50, y: 100 }, context, playerSizeMultiplier);
        }
    } else {
        if (isHurt) {
            posHurt >= hurt.length && (posHurt = 0, isHurt = false);
            animate(posHurt, hurt, { x: 50, y: 100 }, context, playerSizeMultiplier);
        } else {
            if (gameSpeed >= 6) {
                posRun >= run.length && (posRun = 0);
                animate(posRun, run, { x: 50, y: 100 }, context, playerSizeMultiplier);
            } else {
                posWalk >= walk.length && (posWalk = 0);
                animate(posWalk, walk, { x: 50, y: 100 }, context, playerSizeMultiplier);
            }
        }
    }
}

function updateHealth() {
    for (let i = 0; i < hearts.length; i++) {
        if (i >= health) {
            hearts[i].classList.add("heartEmpty");
        } else {
            hearts[i].classList.remove("heartEmpty");
        }
    }
}

function handleItems() {
    if (itemsList.length > 0) {
        if (itemsList[0].x <= -itemsList[0].width) {      //remove item when out of screen
            score += 1;
            scoreDiv.innerHTML = score;
            itemsList.shift();
        }
        itemsList.forEach(item => {
            gameOnGoing && (item.x -= gameSpeed);
            if (item.jumping) {
                if (item.jumpWay == 'up' && item.y > 10) {      //monte
                    item.y -= gameSpeed * 1.5;
                } else if (item.jumpWay == 'up' && item.y < 10) {   //commence décente
                    item.y += gameSpeed * 1.2;
                    item.jumpWay = 'down';
                } else if (item.jumpWay == 'down') {     //décent
                    if (item.y < 135) {
                        item.y += gameSpeed * 1.2;
                    } else {                        //attérit
                        item.y = 135;
                        item.jumpWay = 'up';
                        item.jumping = false;
                    }
                }
            }

            drawItem(item, { x: item.x, y: item.y }, context);

            if (!isHurt && isColision(item, playerPeace)) {
                if (item.type == 'box') {
                    if (health > 1) {
                        isHurt = true;
                    } else {
                        isAlive = false;
                        gameOnGoing = false;
                        localStorage.setItem('score', score);
                        window.location = 'end.html'
                    }
                    health--;
                } else if (item.type == 'heart' && health < 3) {
                    health++;
                    createShortLivedMessage("Vous avez obtenu une vie supplémentaire !");
                }
                // else if (item.type == 'reduceSpeed') {
                //     if (!slowed) {
                //         slowedValue = gameSpeed * 0.3;
                //         gameSpeed = gameSpeed * 0, 7;
                //         slowed = true;
                //     }
                //     slowStartTime = time;
                // }
                else if (item.type == 'coin') {
                    score += 5;
                    scoreDiv.innerHTML = score;
                    createShortLivedMessage("Vous avez obtenu 5 points bonus !");
                }
                updateHealth();
                itemsList.shift();
            }
        });
    }
}

document.addEventListener('keydown', (e) => {
    if (e.code == "Space") {
        if (gameOnGoing) {
            itemsList.every(item => {
                if (!item.jumping) {
                    item.jumping = true;
                    return false;
                } else {
                    return true;
                }
            });
        } else if (isAlive) {
            posIdle = 1;
            gameOnGoing = true;
            playerPeace = "walk";

            let startMessage = document.querySelector(".start-message")
            startMessage.classList.remove('show');
            setTimeout(() => startMessage.remove(), 1000);
        }
    }
});


function start() {
    setInterval(() => {
        if (!gameOnGoing) {
            if (isAlive) {
                posIdle++;
            } else if (posIdle < death.length) {
                posDeath++;
            }
        } else {
            if (isHurt) {
                posHurt++;
            } else {
                if (gameSpeed >= 7) {
                    posRun++;
                } else {
                    posWalk++;
                }
            }
        }
    }, 120);
    setInterval(() => {
        game();
    }, 20);
    setInterval(() => {
        if (gameOnGoing) {
            time += 0.1;
            const timeContainer = document.querySelector(".time");
            timeContainer.innerHTML = `temps : ${time.toFixed(1)} s`;
        }
    }, 100)
    let interval = Math.round(Math.random() * 2000 + 200);
    function itemsInterval() {
        clearInterval(items)
        if (gameOnGoing) {
            let newItem = createItem(gameArea.offsetWidth, health);
            itemsList.push(newItem);
        }
        interval = Math.round(Math.random() * 2000 + 200);
        items = setInterval(() => {
            itemsInterval();
        }, interval);
    }
    let items = setInterval(() => {
        itemsInterval();
    }, interval);
    setInterval(() => {
        gameSpeed += 0.5;
    }, 10000)
    function getRandBackground() {
        return Math.floor((Math.random() * 4) + 1)
    }
    setInterval(() => {
        if (gameOnGoing) {
            let newId = getRandBackground();
            while (newId == BACKGROUND.id) {
                newId = getRandBackground()
            }
            BACKGROUND.image.src = `../images/background/City${newId}.png`;
            BACKGROUND.id = newId;
        }
    }, 30000)
    // setInterval(() => {
    //     if (slowed && slowStartTime + 5 <= time) {
    //         slowed = false;
    //         gameSpeed = gameSpeed + slowedValue;
    //     }
    // }, 1000)
}

function game() {
    clear(canvas, context);
    handleBackGround(BACKGROUND, gameOnGoing ? gameSpeed : 0, context);
    handleItems();
    handlePlayer();
}

function createShortLivedMessage(text) {
    let p = document.createElement('p');
    p.innerHTML = text;
    p.classList.add("show");
    ingameMessage.appendChild(p);
    setTimeout(() => p.classList.remove('show'), 2000);
    setTimeout(() => p.remove(), 2600);
}

document.addEventListener('keydown', (e) => {
    if (e.code == "KeyP" && time > 0 && isAlive) {
        if (gameOnGoing) {
            pauseInfo.classList.add("active");
            gameOnGoing = false;
        } else {
            pauseInfo.classList.remove("active");
            gameOnGoing = true;
        }
    };
});

start();
