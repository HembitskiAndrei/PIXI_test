import {Sprite} from "@pixi/sprite";
import Keyboard from "pixi.js-keyboard";
import {createBullet} from "../utils";

export default class Spaceship {
    constructor(app) {
        this._shipSprite = Sprite.from('./src/assets/textures/spaceShip.png');
        this._shipSprite.anchor.set(0.5);

        this._shipSprite.x = app.screen.width / 2;
        this._shipSprite.y = 5 * app.screen.height / 6;

        app.stage.addChild(this._shipSprite);

        this.bullets = [];
    }

    update(delta, app) {
        const speed = 5 * delta;

        if (Keyboard.isKeyDown('ArrowLeft', 'KeyA')) {
            if (this._shipSprite.x - this._shipSprite.width / 2 > 0) {
                this._shipSprite.x -= speed;
            }
        }
        if (Keyboard.isKeyDown('ArrowRight', 'KeyD')) {
            if (this._shipSprite.x + this._shipSprite.width / 2 < app.screen.width) {
                this._shipSprite.x += speed;
            }
        }

        const bulletY = this._shipSprite.y - this._shipSprite.height / 2;
        if (Keyboard.isKeyReleased('Space')) {
            this.bullets.push(createBullet({
               x: this._shipSprite.x,
               y: bulletY,
               radius: 15,
               color: 0x00FF00
           }, app));
        }

        this.bullets
            .forEach(bullet => {
                if (!bullet.destroyed) {
                    if (bullet.y - bullet.height / 2 > -bulletY - bullet.height) {
                        bullet.y -= speed * 2;
                    } else {
                        bullet.destroy({
                            children: true,
                            texture: true,
                            baseTexture: true,
                        });
                        // this.bullets.shift()
                    }
                }
            });

        Keyboard.update();
    }
}