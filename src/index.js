import "./css/style.css";
import {Application} from "@pixi/app";
import {Loader} from "@pixi/loaders";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { CustomEase } from "gsap/CustomEase";
import {DisplayObject} from "@pixi/display";
import {createBackground} from "./utils/index";
import {createAsteroidField} from "./utils/index";
import Spaceship from "./components/Spaceship";
import EndGameBanner from "./components/EndGameBanner";
import TimerGUI from "./components/TimerGUI";
import AmmoGUI from "./components/AmmoGUI";
import ExplodeParticles from "./components/ExplodeParticles";
import RocketFlame from "./components/RocketFlame";
import Mouse from "pixi.js-mouse";
import {gameConfig} from "./utils/gameConfig";

const app = new Application({
    width: 1280,
    height: 720,
    backgroundColor: 0x1099bb,
    antialiasing: true,
});
document.body.appendChild(app.view);

const loader = new Loader();
loader.add("asteroid", "./src/assets/textures/asteroid.png")
loader.add("spaceship", "./src/assets/textures/spaceship.png");
loader.add("background", "./src/assets/textures/background.png");

loader.load((loader, resources) => {
    createBackground(resources["background"].texture, app);

    const rocketFlame = new RocketFlame(app);

    const spaceShip = new Spaceship(resources["spaceship"].texture, app);

    let asteroids = [];

    const endGameBanner = new EndGameBanner(app);

    const timerGUI = new TimerGUI(gameConfig.timeInSeconds, app);

    const ammoGUI = new AmmoGUI(app);

    document.addEventListener("shot", (e) => {
        ammoGUI.SetText(`${e.detail.ammo}`);
    })

    timerGUI.timer.on("end", () => {
        endGameBanner.ShowBanner("YOU LOSE");
    });

    const explodeParticles = new ExplodeParticles(app);

    rocketFlame.SetParent(spaceShip.GetContainer());

    PixiPlugin.registerPIXI({
        DisplayObject
    });
    gsap.registerPlugin(MotionPathPlugin,PixiPlugin);
    gsap.registerPlugin(CustomEase);

    Mouse.events.on("released", null, () => {
        if (!spaceShip.isReady) {
            endGameBanner.HideBanner();
            timerGUI.Reset();
            timerGUI.Start();
            spaceShip.Reset();
            ammoGUI.SetText(`${spaceShip.ammo}`);
            asteroids.forEach(asteroid => {
                asteroid.animation.kill();
                asteroid.Destroy();
            })
            asteroids = createAsteroidField(resources["asteroid"].texture, gsap, app);
        }
    });

    app.ticker.add(delta => {
        const speed = 5 * delta;

        explodeParticles.Update(app.ticker.deltaMS * 0.001);
        rocketFlame.Update(app.ticker.deltaMS * 0.001);

        timerGUI.Update(app.ticker.deltaMS * 0.001);

        spaceShip.Update(speed, app);
        spaceShip.UpdateBullets(speed, () => {
            if (spaceShip.ammo === 0 && asteroids.length > 0) {
                endGameBanner.ShowBanner("YOU LOSE");
                timerGUI.Stop();
                spaceShip.isReady = false;
            }
        });

        asteroids.forEach((asteroid, asteroidIndex) => {
            spaceShip.bullets.forEach((bullet, bulletIndex) => {
                if (!asteroid.asteroidSprite.destroyed && !bullet.destroyed) {
                    const localPosition = asteroid.asteroidSprite.toLocal(bullet._graphics.position);
                    if (asteroid.asteroidSprite.hitArea.contains(localPosition.x, localPosition.y)) {
                        explodeParticles.Start(asteroid.asteroidSprite.x, asteroid.asteroidSprite.y)
                        bullet.Destroy();
                        spaceShip.bullets.splice(bulletIndex, 1);
                        asteroid.animation.kill();
                        asteroid.Destroy();
                        asteroids.splice(asteroidIndex, 1);
                        if (asteroids.length === 0) {
                            endGameBanner.ShowBanner("YOU WIN");
                            spaceShip.isReady = false;
                        }
                    }
                }
            });
        });
    });
});


