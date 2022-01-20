import {Sprite} from "@pixi/sprite";
import Keyboard from "pixi.js-keyboard";
import Bullet from "./Bullet";
import {gameConfig} from "../utils/gameConfig";
import {Container} from "@pixi/display";

export default class Spaceship {
    constructor(texture, app) {
        this.isReady = false;

        this._container = new Container();
        app.stage.addChild(this._container);

        this._shipSprite = new Sprite(texture);
        this._shipSprite.anchor.set(0.5);

        this._shipSprite.x = app.screen.width / 2;
        this._shipSprite.y = 4 * app.screen.height / 5;

        this._container.addChild(this._shipSprite);

        this.bullets = [];

        this.currentPressedKey = null;

        this.ammo = gameConfig.ammo;

        this._screenWidth = app.screen.width;

        this.eventShot = null;
    }

    _MoveLeft(speed) {
        if (Keyboard.isKeyPressed("ArrowLeft", "KeyA")) {
            this.currentPressedKey = "left";
        }
        if (this.currentPressedKey === "left" && Keyboard.isKeyDown("ArrowLeft", "KeyA")) {
            if (this._container.x - this._shipSprite.width / 2> -this._screenWidth / 2) {
                this._container.x -= speed;
            }
        }
        if (Keyboard.isKeyReleased("ArrowLeft", "KeyA")) {
            this.currentPressedKey = "right";
        }
    }

    _MoveRight(speed) {
        if (Keyboard.isKeyPressed("ArrowRight", "KeyD")) {
            this.currentPressedKey = "right";
        }
        if (this.currentPressedKey === "right" && Keyboard.isKeyDown("ArrowRight", "KeyD")) {
            if (this._container.x + this._shipSprite.width / 2 < this._screenWidth / 2) {
                this._container.x += speed;
            }
        }
        if (Keyboard.isKeyReleased("ArrowRight", "KeyD")) {
            this.currentPressedKey = "left";
        }
    }

    _Shot(speed, app) {
        if (Keyboard.isKeyReleased("Space")) {
            if (this.ammo > 0) {
                this.ammo -= 1;
                this.bullets.push(new Bullet({
                    x: this._shipSprite.x + this._container.x,
                    y: this._shipSprite.y - this._shipSprite.height / 2,
                    radius: 15,
                    color: 0x00FF00
                }, app));
                this.eventShot = new CustomEvent("shot",{
                    detail: {
                        ammo: this.ammo
                    }
                });
                document.dispatchEvent(this.eventShot);
            }
        }
    }

    GetContainer() {
        return this._container
    }

    Reset() {
        Keyboard.keyStates.clear();
        this.ammo = gameConfig.ammo;
        this.isReady = true;
    }

    UpdateBullets(speed, destroyingBulletCallback) {
        this.bullets
            .forEach((bullet, index) => {
                bullet.Move(speed, () => {
                    this.bullets.splice(index, 1);
                    if (destroyingBulletCallback) {
                        destroyingBulletCallback();
                    }
                })
            });
    }

    Update(speed, app) {
        if (this.isReady) {
            this._MoveLeft(speed);

            this._MoveRight(speed);

            this._Shot(speed, app);

            Keyboard.update();
        }
    }
}