const gameArea = document.querySelector('.game-area');
const player = document.querySelector('.player');
const pauseInfo = document.querySelector('#pause');
let ingameMessage = document.querySelector(".ingame-message");
let score = 0;
let isGameOver = false;
const startTime = new Date();
let speed = 5;
let life = 3;
let previousDelay = startTime;
let isGameStarted = false;
let isGamePaused = false;

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
    if (!isGamePaused) {
        if (Math.random() < 0.05) {
            addBonusBox();
        } else if (Math.random() < 0.10 && Math.random() > 0.05) {
            addPotionBox();
        } else if (Math.random() < 0.15 && Math.random() > 0.10 && life < 3) {
            addHeart();
        } else {
            const box = document.createElement('div');
            box.classList.add('box');
            gameArea.appendChild(box);

            let boxLeft = gameArea.offsetWidth;
            const moveBox = setInterval(() => {
                if (isGamePaused) return;

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
                    life -= 1;
                    clearInterval(moveBox);
                    gameArea.removeChild(box);
                    updateLife();
                    if (life === 0) {
                        gameOver();
                    }

                }
            }, 10);
        }
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
        if (isGamePaused) return;
        x -= getSpeed();
        bonusBox.style.left = `${x}px`;

        // Vérifier si la boîte bonus touche le joueur
        if (isCollide(bonusBox)) {
            clearInterval(bonusBoxInterval);
            bonusBox.remove();
            score += 5;
            // Faire quelque chose lorsque le joueur touche la boîte bonus
            createShortLivedMessage("Vous avez obtenu 5 points bonus !");
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
        if (isGamePaused) return;
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
            createShortLivedMessage("La vitesse est ralenti pendant un court instant !");
        }
    }, 10);
}

function addHeart() {
    console.log("addHeart");
    // Créer une div pour la boîte bonus
    let heart = document.createElement("div");
    heart.classList.add("box", "getHeart");
    let x = gameArea.offsetWidth;

    // Ajouter la boîte bonus à la zone de jeu
    gameArea.appendChild(heart);

    // Déplacer la boîte bonus vers la gauche jusqu'à sortir de la zone de jeu
    let heartInterval = setInterval(function () {
        if (isGamePaused) return;
        x -= getSpeed();
        heart.style.left = `${x}px`;

        // Vérifier si la boîte bonus touche le joueur
        if (isCollide(heart)) {
            clearInterval(heartInterval);
            heart.remove();
            // Faire quelque chose lorsque le joueur touche la boîte bonus
            if (life < 3) {
                life += 1;
                updateLife();
                createShortLivedMessage("Vous avez obtenu une vie supplémentaire !");
            }
        }
    }, 10);
}

function jump() {
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
    if (e.code == "Space") jump(e);

});

//si le user clique alors la premiere box saute
document.addEventListener('click', (e) => {
    jump(e);

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
    updateScore();
    if (isGameOver) return;
    createBox();
    setTimeout(generateRandomBox, generateRandomTime());
}

function generateRandomTime() {
    if (!isGamePaused) return (Math.random() * 100 + 500);
}

function updateLife() {
    let heartCount = life;

    // Récupère les éléments HTML des cœurs
    const hearts = document.querySelectorAll(".heart");

    // Met à jour les cœurs en fonction du nombre de vies restantes
    for (let i = 0; i < hearts.length; i++) {
        if (i >= heartCount) {
            hearts[i].classList.add("heartEmpty");
        } else {
            hearts[i].classList.remove("heartEmpty");
        }
    }
}

function updateScore() {
    const scoreDiv = document.querySelector(".score");
    scoreDiv.innerHTML = score;
}


// Démmarer le jeu en appuyant sur entrée
document.addEventListener('keydown', (e) => {
    if (e.code == "Enter" && !isGameStarted) {
        let startMessage = document.querySelector(".start-message")
        generateRandomBox();
        startMessage.classList.remove('show');
        setTimeout(() => startMessage.remove(), 1000);
        isGameStarted = true;

    };
});


// Créer des messages éphemaires
function createShortLivedMessage(text) {
    let p = document.createElement('p');
    p.innerHTML = text;
    p.classList.add("show");
    ingameMessage.appendChild(p);
    setTimeout(() => p.classList.remove('show'), 2000);
    setTimeout(() => p.remove(), 2600);
}


document.addEventListener('keydown', (e) => {
    if (e.code == "KeyP" && isGameStarted) {
        if (isGamePaused) {
            pauseInfo.classList.remove("active");
            isGamePaused = false;
        } else {
            pauseInfo.classList.add("active");
            isGamePaused = true;
        }
    };
});


