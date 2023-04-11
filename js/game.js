const gameArea = document.querySelector('.game-area');
const player = document.querySelector('.player');
let score = 0;
let isGameOver = false;

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

        boxLeft -= 2;
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
    }, 10);

}

//si le user clique alors la premiere box saute
document.addEventListener('click', (e) => {
    console.log(e);
    boxs = document.querySelectorAll('.box');
    boxs[0].style.top = '100px';
    setTimeout(() => {
        boxs[0].style.top = '0px';
    }, 1000);
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
}, 1500);