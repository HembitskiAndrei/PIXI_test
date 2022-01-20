import {TimerManager} from "../utils/timer";
import {timeFormat} from "../utils";
import {Text, TextStyle} from "@pixi/text";

export default class TimerGUI {
    constructor(intervalInSeconds, app) {
        this._intervalInSeconds = intervalInSeconds;

        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 42,
            fontWeight: 'bold',
            fill: ['#88ff00', '#18c613'], // gradient
            stroke: '#781d1d',
            strokeThickness: 4,
            wordWrap: true,
            wordWrapWidth: 1000,
            lineJoin: 'round',
        });

        this._timerText = new Text(timeFormat(this._intervalInSeconds), style);
        this._timerText.x = 50;
        this._timerText.y = app.screen.height - 75;

        app.stage.addChild(this._timerText);

        this._timerManager = new TimerManager();

        this.timer = this._timerManager.createTimer(1000);
        this.timer.repeat = this._intervalInSeconds - 1;
        this.timer.on('end', (elapsed) => {
            this._timerText.text = timeFormat(0);
        });
        this.timer.on('repeat', (elapsed, repeat) => {           
            this._timerText.text = timeFormat(this._intervalInSeconds - repeat)
        });
    }

    Update(delta) {
        this._timerManager.update(delta);
    }

    Start() {
        this.timer.start();
    }

    Stop() {
        this.timer.stop();
    }

    Reset() {
        this.timer.reset();
        this._timerText.text = timeFormat(this._intervalInSeconds)
    }
}