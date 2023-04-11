const gameArea = document.querySelector('.game-area');
const player = document.querySelector('.player');
let score = 0;
let isGameOver = false;
const startTime = new Date();
let speed = 5;
let previousDelay = startTime;

function getSpeed() {
    let delay = Math.ceil((new Date().getTime() - startTime.getTime()) / 1000);
    if (previousDelay != delay) {
        let tmp;
        delay % 10 == 0 ? tmp = speed + 0.5 : tmp = speed;
        speed = tmp;
        previousDelay = delay;
    }

    return speed;
}


function createBox() {
    if (Math.random() < 0.05) {
        addBonusBox();
    } else if (Math.random() < 0.10 && Math.random() > 0.05) {
        addPotionBox();
    } else {
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

            if (boxLeft < -10) {
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
}

function addBonusBox() {
    console.log("addBonusBox");
    // Créer une div pour la boîte bonus
    let bonusBox = document.createElement("div");
    bonusBox.classList.add("box", "bonus");
    let x = gameArea.offsetWidth;

    // Ajouter la boîte bonus à la zone de jeu
    gameArea.appendChild(bonusBox);

    // Déplacer la boîte bonus vers la gauche jusqu'à sortir de la zone de jeu
    let bonusBoxInterval = setInterval(function () {
        x -= getSpeed();
        bonusBox.style.left = `${x}px`;

        // Vérifier si la boîte bonus touche le joueur
        if (isCollide(bonusBox)) {
            clearInterval(bonusBoxInterval);
            bonusBox.remove();
            score += 5;
            // Faire quelque chose lorsque le joueur touche la boîte bonus
            console.log("Vous avez obtenu un bonus !");
        }

        // Supprimer la boîte bonus si elle sort de la zone de jeu
        if (x < -50) {
            clearInterval(bonusBoxInterval);
            bonusBox.remove();
        }
    }, 10);
}

function addPotionBox() {
    console.log("addPotionBox");
    // Créer une div pour la boîte bonus
    let potionBox = document.createElement("div");
    potionBox.classList.add("box", "potion");
    let x = gameArea.offsetWidth;

    // Ajouter la boîte bonus à la zone de jeu
    gameArea.appendChild(potionBox);

    // Déplacer la boîte bonus vers la gauche jusqu'à sortir de la zone de jeu
    let potionBoxInterval = setInterval(function () {
        x -= getSpeed();
        potionBox.style.left = `${x}px`;

        // Vérifier si la boîte bonus touche le joueur
        if (isCollide(potionBox)) {
            clearInterval(potionBoxInterval);
            potionBox.remove();
            // Faire quelque chose lorsque le joueur touche la boîte bonus
            if (speed > 1) {
                speed -= 1;
                setTimeout(() => {
                    speed += 1;
                }, 5000);
            }
            console.log("Vous avez obtenu un bonus !");
        }
    }, 10);
}

function setOnClick() {
    let boxs = document.querySelectorAll('.box');
    for (let i = 0; i < boxs.length; i++) {
        if (!boxs[i].classList.contains('jump')) {
            boxs[i].classList.add('jump');
            setTimeout(() => {
                boxs[i].classList.remove('jump');
            }, 500);
            break;
        }
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


// generer des boxs avec des intervalles de temps aleatoires
function generateRandomBox() {
    if (isGameOver) return;
    createBox();
    setTimeout(generateRandomBox, generateRandomTime());
}

function generateRandomTime() {
    return (Math.random() * 100 + 500);
}

generateRandomBox();