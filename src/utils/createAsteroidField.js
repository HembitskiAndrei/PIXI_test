import {generatePositionsArray, getRandomPosition, getRandomInt} from "./index";
import Asteroid from "../components/Asteroid";
import { CustomEase } from "gsap/CustomEase";

export const createAsteroidField = (texture, gsap, app) => {
    const positions = generatePositionsArray(1150, 250, 210, 50);
    const asteroids = [];
    const targets = generatePositionsArray(1100, 250, 10, 0);
    for (let i = 0; i < 5; i++) {
        const position = getRandomPosition(positions, true);
        const asteroid = new Asteroid(texture, position.x - 50, position.y - 200, app);

        const target = [
            getRandomPosition(targets, true),
            getRandomPosition(targets, true),
            getRandomPosition(targets, true),
        ]

        let path = [
            { x: position.x, y: position.y},
            { x: target[0].x + 120, y: target[0].y + 75},
            { x: target[1].x + 120, y: target[1].y + 75},
            { x: target[1].x + 120, y: target[2].y + 75},
            { x: position.x, y: position.y},
        ];

        asteroid.animation = gsap.to(asteroid.asteroidSprite, {
            duration: getRandomInt(5, 12),
            motionPath: {
                path: path,
                autoRotate: false,
                curviness: 2,
                fromCurrent: false,
                alignOrigin: [0.5, 0.5]
            },
            ease: CustomEase.create("custom", "M0,0 C0.296,0.38 0.428,0.389 0.554,0.514 0.655,0.614 0.824,0.906 1,1 "),
            immediateRender: true,
            repeat: -1,
            yoyo: false,
            pixi: {
                angle: 720
            }
        });

        asteroids.push(asteroid);
    }

    return asteroids
}