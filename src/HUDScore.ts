import { gsap } from 'gsap';

import HUDObject from './base/HUDObject';
import HUDImage from './base/HUDImage';
import HUDText from './base/HUDText';

import HUDScoreKill from './HUDScoreKill';
import HUDScoreMain from './HUDScoreMain';
import HUDScorePoints from './HUDScorePoints';

import IScorePoint from './IScorePoint';

class HUDScore extends HUDObject {
    kill: HUDScoreKill;
    main: HUDScoreMain;
    points: HUDScorePoints;

    constructor(){
        super();

        this.kill = new HUDScoreKill();
        this.addChild(this.kill);

        this.main = new HUDScoreMain();
        this.addChild(this.main);

        this.points = new HUDScorePoints();
        this.addChild(this.points);
    }

    onResize(width: number = 0, height: number = 0){
        this.kill.position.set(width / 2, 200);

        this.main.position.set(width / 2, 450);

        this.points.position.set(width / 2, 500);
    }

    onPlayerScore(score: number) {
        this.main.addScore(score);
    }

    onPlayerKill(pName: string) {
        this.kill.add(pName);
    }

    onPlayerPoint(point: IScorePoint){
        this.points.add(point);
    }
    
}

export default HUDScore;