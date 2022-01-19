import {Sprite} from "@pixi/sprite";

export const createBackground = (app) => {
    const background = Sprite.from('./src/assets/textures/background.png');

    background.anchor.set(0.5);

    background.x = app.screen.width / 2;
    background.y = app.screen.height / 2;

    app.stage.addChild(background);
}