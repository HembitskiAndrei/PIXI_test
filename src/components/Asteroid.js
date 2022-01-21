import {Sprite} from "@pixi/sprite";
import {Circle} from "@pixi/math";

export default class Asteroid {
    constructor(texture, x, y, app) {
        this.asteroidSprite = new Sprite(texture);
        this.asteroidSprite.zIndex = 5;
        this.asteroidSprite.anchor.set(0.5);

        this.asteroidSprite.x = x;
        this.asteroidSprite.y = y;

        this.asteroidSprite.interactive = true;
        this.asteroidSprite.hitArea = new Circle(0, 0, 70);

        app.stage.addChild(this.asteroidSprite);
    }
    
    Destroy() {
        this.asteroidSprite.destroy({
            children: true,
            texture: false,
            baseTexture: false,
        });
    }
}