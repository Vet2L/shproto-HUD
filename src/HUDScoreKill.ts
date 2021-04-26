import { gsap } from 'gsap';

import HUDObject from './base/HUDObject';
import HUDText from './base/HUDText';
import HUDImage from './base/HUDImage';

class HUDScoreKill extends HUDObject {
    skull: HUDImage;
    playerName: HUDText;
    namesTimeline: gsap.core.Timeline;

    _playerNames: Array<string> = [];

    constructor(){
        super();

        this.skull = new HUDImage('./skull.png');
        this.skull.anchor.set(0.5);
        this.skull.alpha = 0;
        this.addChild(this.skull);

        this.playerName = new HUDText("ENEMY", "#FF0000");
        this.playerName.fontSize = 40;
        this.playerName.anchor.set(0.5);
        this.playerName.alpha = 0;
        this.addChild(this.playerName);

        this.namesTimeline = gsap.timeline();

        this.playerName.position.y = 200;
    }

    show(){
        if (!this._playerNames.length) { return; }

        this.skull.alpha = 0;
        this.playerName.alpha = 0;

        this.playerName.text = this._playerNames[0];

        gsap.to(this.skull, {
            alpha: 1, 
            repeat: 1,
            yoyo: true,
            duration: 0.4
        });
        gsap.to(this.playerName, {
            alpha: 1, 
            repeat: 1,
            yoyo: true,
            duration: 0.4,
            onComplete: () => {
                this._playerNames.shift();
                this.show();
            }
        });
    }

    add(name: string){
        this._playerNames.push(name);
        if (this._playerNames.length === 1) { this.show(); }
    }

}

export default HUDScoreKill;