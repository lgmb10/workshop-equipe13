const gameArea = document.querySelector('.game-area');
const player = document.querySelector('.player');
let score = 0;
let isGameOver = false;
const startTime = new Date();
let speed = 5;
let previousDelay = startTime;

function getSpeed() {
    let delay = Math.ceil((new Date().getTime() - startTime.getTime()) / 1000);
    console.log("delay" + delay);
    console.log("previousDelay" + previousDelay);
    console.log("speed" + speed);


    if (previousDelay != delay) {
        let tmp;
        delay % 10 == 0 ? tmp = speed + 0.5 : tmp = speed;
        speed = tmp;
        previousDelay = delay;
    }

    return speed;
}


function createBox() {
    const box = document.createElement('div');
    box.classList.add('box');
    gameArea.appendChild(box);

    let boxLeft = gameArea.offsetWidth;
    const moveBox = setInterval(() => {
        if (isGameOver) {
            clearInterval(moveBox);
            return;
        }

        boxLeft -= getSpeed();
        box.style.left = `${boxLeft}px`;

        if (boxLeft < -20) {
            clearInterval(moveBox);
            gameArea.removeChild(box);
            score++;
        }

        if (isCollide(box)) {
            gameOver();
            clearInterval(moveBox);
        }
    }, 5);

}

function setOnClick(e) {
    let boxs = document.querySelectorAll('.box');
    let box = boxs[0];
    if (box) {
        box.classList.add('jump');
        setTimeout(() => {
            box.classList.remove('jump');
        }, 1000);
    }
}

//si le user clique alors la premiere box saute
document.addEventListener('keydown', (e) => {
    if (e.code == "Space") setOnClick(e);

});

//si le user clique alors la premiere box saute
document.addEventListener('click', (e) => {
    setOnClick(e);

});


function isCollide(box) {
    const boxRect = box.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    return !(
        boxRect.bottom < playerRect.top ||
        boxRect.top > playerRect.bottom ||
        boxRect.right < playerRect.left ||
        boxRect.left > playerRect.right
    );
}

function gameOver() {
    isGameOver = true;
    alert(`Game over!\nScore: ${score}`);
}

const boxInterval = setInterval(() => {
    createBox();
}, 2000);