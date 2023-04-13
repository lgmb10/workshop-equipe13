function spritePositionToImagePosition(spriteItem,itemWidth,spacing) {
    return spriteItem * (spacing + itemWidth);
}

export function animate(spriteItem,sprite,coo,context,sizeMultiplier=sizeMultiplier ?? 1) {
    var SpringPosition = spritePositionToImagePosition(spriteItem,sprite.itemWidth,sprite.spacing);
    context.drawImage(
        sprite.image,
        SpringPosition,
        0,
        sprite.itemWidth,
        sprite.height,
        coo.x,
        coo.y,
        sprite.itemWidth * sizeMultiplier,
        sprite.height * sizeMultiplier
    );
}

export function handleBackGround(BG,gameSpeed,context) {
    // console.log('test',BG.x1,BG.x2, gameSpeed)
    if (BG.x1 <= -BG.width) BG.x1 = BG.width;
    else if (BG.x2 <= -BG.width) BG.x2 = BG.width;
    else if (BG.x1 <= 0) BG.x1 -= gameSpeed, BG.x2 = BG.x1 + BG.width
    else BG.x2 -= gameSpeed, BG.x1 = BG.x2 + BG.width
    context.drawImage(BG.image, BG.x1, BG.y, BG.width, BG.height);
    context.drawImage(BG.image, BG.x2, BG.y, BG.width, BG.height)
}

export function clear(canvas,context) {
    context.clearRect(0,0,canvas.width,canvas.height);
}