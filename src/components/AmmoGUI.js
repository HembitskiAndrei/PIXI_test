import {Text, TextStyle} from "@pixi/text";
import {Container} from "@pixi/display";

export default class AmmoGUI {
    constructor(app) {
        const container = new Container();
        container.x = app.screen.width - 100;
        container.y = app.screen.height - 100;
        app.stage.addChild(container);

        const ammoTextStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 38,
            fontWeight: 'bold',
            fill: ['#ffaa00', '#994b0f'], // gradient
            stroke: '#45b62c',
            strokeThickness: 3,
            wordWrap: true,
            wordWrapWidth: 1000,
            lineJoin: 'round',
        });

        this._ammoLabelText = new Text("Ammo", ammoTextStyle);
        this._ammoLabelText.anchor.set(0.5);

        container.addChild(this._ammoLabelText);

        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 42,
            fontWeight: 'bold',
            fill: ['#ff6d4a', '#ff0c00'], // gradient
            stroke: '#1d786d',
            strokeThickness: 4,
            wordWrap: true,
            wordWrapWidth: 1000,
            lineJoin: 'round',
        });

        this._ammoText = new Text("10", style);
        this._ammoText.anchor.set(0.5);
        this._ammoText.y = 50;

        container.addChild(this._ammoText);
    }

    SetText(text) {
        this._ammoText.text = text;
    }
}