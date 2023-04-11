function spritePositionToImagePosition(spriteItem,itemWidth,spacing) {
    return spriteItem * (spacing + itemWidth);
}

export function animate(spriteItem,sprite,coo,context) {

    var SpringPosition = spritePositionToImagePosition(spriteItem,sprite.itemWidth,sprite.spacing);
    context.drawImage(
        sprite.image,
        SpringPosition,
        0,
        sprite.itemWidth,
        sprite.height,
        coo.x,
        coo.y,
        sprite.itemWidth,
        sprite.height
    );

}

export function clear(canvas,context) {
    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}