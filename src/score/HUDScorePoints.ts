import { gsap } from 'gsap';

import HUDObject from '../base/HUDObject';
import HUDText from '../base/HUDText';

import IScorePoint from './IScorePoint';

class HUDScorePoints extends HUDObject {
    _points: Array<IScorePoint> = [];
    points: Array<HUDText> = [];

    constructor(){
        super();
    }

    spawnPoint(data: IScorePoint): HUDText {
        let point = new HUDText(`${data.type} +${data.points}`, '#000000');
        point.anchor.set(0.5);
        this.addChild(point);
        point.alpha = 0;
        point.pivot.x = 300;

        return point;
    }

    add(point: IScorePoint){
        this._points.push(point);
        if (this._points.length === 1) { this.show(); }
    }

    show(){
        if (!this._points.length) { return; }

        let data = this._points[0];/*.shift();*/
        let point = this.spawnPoint(data);

        /* move all points down */
        for (let i = 0; i < this.points.length; ++i) {
            gsap.to(this.points[i].position, {
                y: 32 * (this.points.length - i),
                duration: 0.4
            });
        }
        this.points.push(point);

        gsap.to(point.pivot, {
            x: 0,
            ease: "back",
            duration: 0.4
        });
        gsap.to(point, {
            alpha: 1,
            duration: 0.4,
            onComplete: ()=>{
                this._points.shift();
                this.show();
            }
        });
        gsap.to(point, {
            alpha: 0,
            duration: 0.5,
            delay: 2,
            onComplete: ()=>{
                this.onPointComplete(point);
            }
        });
    }

    onPointComplete(point: HUDText){
        this.removeChild(point);
        this.points.splice(this.points.indexOf(point), 1);
    }
}

export default HUDScorePoints;