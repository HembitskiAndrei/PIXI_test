import {Container} from "@pixi/display";
import {Graphics} from "@pixi/graphics";
import {Text, TextStyle} from "@pixi/text";

export default class EndGameBanner {
    constructor(app) {
        this._container = new Container();
        app.stage.addChild(this._container);

        const graphics = new Graphics();

        graphics.lineStyle(0);
        graphics.beginFill(0x767676, 0.25);
        graphics.drawRect(0, 0, app.screen.width, app.screen.height / 2);
        graphics.endFill();

        graphics.y = app.screen.height / 4;

        this._container.addChild(graphics);

        const style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 100,
            fontWeight: "bold",
            fill: ["#ffb700", "#d2381d"], // gradient
            stroke: "#49dfff",
            strokeThickness: 5,
            wordWrap: true,
            wordWrapWidth: 1000,
            lineJoin: "round",
        });

        this._bannerText = new Text("", style);
        this._bannerText.anchor.set(0.5);
        this._bannerText.x = app.screen.width / 2;
        this._bannerText.y = app.screen.height / 2;

        this._container.addChild(this._bannerText);

        const clickStyle = new TextStyle({
            fontFamily: "Arial",
            fontSize: 32,
            fontWeight: "bold",
            fill: ["#e5ddbf", "#dcb9b3"], // gradient
            stroke: "#14364c",
            strokeThickness: 4,
            wordWrap: true,
            wordWrapWidth: 1000,
            lineJoin: "round",
        });

        this._clickText = new Text("Click for START", clickStyle);
        this._clickText.anchor.set(0.5);
        this._clickText.x = app.screen.width / 2;
        this._clickText.y = app.screen.height / 2 + 100;

        this._container.addChild(this._clickText);
    }

    ShowBanner(text) {
        this._container.visible = true;
        this._bannerText.text = text;
    }

    HideBanner() {
        this._container.visible = false;
    }
}