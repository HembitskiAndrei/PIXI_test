import "./css/style.css";
import * as PIXI from "pixi.js";
import {createBackground} from "./utils/index";
import {createAsteroidField} from "./utils/index";
import Spaceship from "./components/Spaceship";


const app = new PIXI.Application({
    width: 1280,
    height: 720,
    backgroundColor: 0x1099bb,
    antialiasing: true,
});
document.body.appendChild(app.view);

createBackground(app);

const spaceShip = new Spaceship(app);

const asteroids = createAsteroidField(app);

app.ticker.add(delta => {
    spaceShip.update(delta, app);
    asteroids.forEach(asteroid => {
        spaceShip.bullets.forEach(bullet => {
            if (!asteroid.asteroidSprite.destroyed && !bullet.destroyed) {
                const localPosition = asteroid.asteroidSprite.toLocal(bullet.position);
                if (asteroid.asteroidSprite.hitArea.contains(localPosition.x, localPosition.y)) {
                    console.log("hit");
                    bullet.destroy({
                        children: true,
                        texture: true,
                        baseTexture: true,
                    });
                    spaceShip.bullets.shift();
                    asteroid.asteroidSprite.destroy({
                        children: true,
                        texture: false,
                        baseTexture: false,
                    });
                }
            }
        });
    })
    console.log(asteroids)
});