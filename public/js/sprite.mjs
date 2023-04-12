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
    if (BG.x1 <= -BG.width + gameSpeed) BG.x1 = BG.width;
    else BG.x1 -= gameSpeed;
    if (BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width;
    else BG.x2 -= gameSpeed;
    context.drawImage(BG.image, BG.x1, BG.y, BG.width, BG.height);
    context.drawImage(BG.image, BG.x2, BG.y, BG.width, BG.height)
}

export function clear(canvas,context) {
    context.clearRect(0,0,canvas.width,canvas.height);
}