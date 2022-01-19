import {Graphics} from "@pixi/graphics"

export const createBullet = (configBullet, app) => {
    const graphics = new Graphics();

    graphics.lineStyle(0);
    graphics.beginFill(configBullet.color, 1);
    graphics.drawCircle(0, 0, configBullet.radius);
    graphics.endFill();

    graphics.x = configBullet.x;
    graphics.y = configBullet.y;

    app.stage.addChild(graphics);

    return graphics
}