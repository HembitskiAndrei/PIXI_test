import {generatePositionsArray, getRandomPosition} from "./index";
import Asteroid from "../components/Asteroid";

export const createAsteroidField = (texture, app) => {
    const positions = generatePositionsArray(1150, 360, 210, 50);
    const asteroids = [];
    for (let i = 0; i < 5; i++) {
        const position = getRandomPosition(positions, true)
        asteroids.push(new Asteroid(texture, position.x - 50, position.y - 200, app));
    }

    return asteroids
}