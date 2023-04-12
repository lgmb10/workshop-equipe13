const item = {
    x:0,
    y:135,
    originWidth:160,
    originHeight:160,
    width:50,
    height:50,
    jumping:false,
    jumpWay:'up',
    image: new Image(),
    type: 'box'
}

const box1 = new Image();
box1.src = "src/img/box3.png";

const box2 = new Image();
box2.src = "src/img/box2.png";

const heart = new Image();
heart.src = "src/img/heart.png";

const reduceSpeed = new Image();
reduceSpeed.src = "src/img/potionVitesse.png";

const coin = new Image();
coin.src = "src/img/coin.png";

export function createItem(width,health) {
    var newItem = {...item};
    newItem.x = width;
    let randType = Math.floor(Math.random()*100);
    if (health < 3 && randType <= 5) {
        newItem.type = 'heart';
        newItem.image = heart;
    } else if (randType > 5 && randType <= 10) {
        newItem.type = 'coin',
        newItem.image = coin;
    }
    // else if (randType > 10 && randType <= 50) {
    //     newItem.type = 'reduceSpeed',
    //     newItem.image = reduceSpeed;
    // } 
    else {
        var rand = Math.random();
        if (rand >= 0.5) {
            newItem.image = box1;
        } else {
            newItem.image = box2;
        }
    }
    return newItem;
}

export function drawItem(item,coo,context) {
    context.drawImage(
        item.image,
        0,
        0,
        item.originWidth,
        item.originHeight,
        coo.x,
        coo.y,
        item.width,
        item.height
    );
}

export function isColision(item,playerPeace) {
    if (item.x > 49 && item.y >= 100) {         //vérfifie si derrière ou au dessus
        if ((playerPeace == "walk" && item.x <= 80) || playerPeace == "run" && item.x <= 88) { //vérifie si avant
            return true;
        } else return false;
    } else return false;
}