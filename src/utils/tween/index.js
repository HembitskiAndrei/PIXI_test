export {TweenManager} from './TweenManager';
export {Tween} from './Tween';
export {TweenPath} from './TweenPath';
export {Easing} from './Easing';
import {Graphics} from "@pixi/graphics";

Graphics.prototype.drawPath = function(path){
    path.parsePoints();
    this.drawShape(path.polygon);
    return this;
}