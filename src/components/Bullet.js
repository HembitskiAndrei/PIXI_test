import {Graphics} from "@pixi/graphics";

export default class Bullet {
    constructor(configBullet, app) {
        this._graphics = new Graphics();

        this._graphics.lineStyle(0);
        this._graphics.beginFill(configBullet.color, 1);
        this._graphics.drawCircle(0, 0, configBullet.radius);
        this._graphics.endFill();

        this._graphics.x = configBullet.x;
        this._graphics.y = configBullet.y;

        app.stage.addChild(this._graphics);
    }

    Move(speed, arrayCuttingCallback) {
        if (!this._graphics.destroyed) {
            if (this._graphics.y + this._graphics.height > this._graphics.height) {
                this._graphics.y -= speed * 2;
            } else {
                this.Destroy();
                if (arrayCuttingCallback) {
                    arrayCuttingCallback()
                }
            }
        }
    }

    Destroy() {
        this._graphics.destroy({
            children: true,
            texture: true,
            baseTexture: true,
        });
    }
}