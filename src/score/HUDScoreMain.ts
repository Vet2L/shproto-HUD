import HUDObject from '../base/HUDObject';
import HUDText from '../base/HUDText';
import { gsap } from 'gsap';

class HUDScoreMain extends HUDObject {
    durationTimeline: gsap.core.Timeline;
    _score: number = 0;
    score: HUDText;

    constructor(){
        super();

        this.score = new HUDText();
        this.score.fontSize = 40;
        this.score.alpha = 0;
        this.score.anchor.set(0.5);
        this.addChild(this.score);
    }

    show(){
        gsap.to(this.score, {
            alpha: 1,
            duration: 0.1
        });
        
        if (this.durationTimeline) { this.durationTimeline.restart(); }
        else {
            this.durationTimeline = gsap.timeline();
            this.durationTimeline.to(this.score, {
                fontSize: 40 * 1.2,
                duration: 0.1
            });
            this.durationTimeline.to(this.score, {
                fontSize: 40,
                duration: 0.2
            });
            this.durationTimeline.to(this.score, {
                duration: 4
            });
            this.durationTimeline.to(this.score, {
                alpha: 0,
                duration: 0.3,
                onComplete: ()=>{
                    this._score = 0;
                }
            });
        }
    }

    addScore(score: number){
        return this.setScore(this._score + score);
    }

    setScore(score: number){
        this._score = score;
        this.score.text = `${this._score}`;

        this.show();
    }
}

export default HUDScoreMain;