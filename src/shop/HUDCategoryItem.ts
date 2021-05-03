import HUDObject from '../base/HUDObject';
import HUDGraphics from '../base/HUDGraphics';
import HUDText from '../base/HUDText';

import HUDShopItem from './HUDShopItem';

import IShopCategory from './IShopCategory';

import { gsap } from 'gsap';

class HUDCategoryItem extends HUDObject {
    background: HUDGraphics;
    label: HUDText;
    items: Array<HUDShopItem>;

    _data: IShopCategory;

    constructor(data: IShopCategory){
        super();

        this._data = data;

        this.background = new HUDGraphics();
        this.background.fillStyle('#111111').drawRect(0, 0, 2, 2);
        this.background.alpha = 0.5;
        this.addChild(this.background);

        this.label = new HUDText(data.name, '#ffffff');
        this.label.fontSize = 30;
        this.label.anchor.set(0, 0.5);
        this.addChild(this.label);

        this.label.position.set(5, 5);
    }

    onFocus(){
        // this.alpha = 1;
        gsap.to(this.background, {
            alpha: 0.75,
            duration: 0.4
        });
    }

    onUnfocus(){
        // this.alpha = 0.5;
        gsap.to(this, {
            alpha: 0.5,
            duration: 0.4
        });
    }

    resetFocus(){
        // this.alpha = 1;
        gsap.to(this, {
            alpha: 1,
            duration: 0.4
        });
        gsap.to(this.background, {
            alpha: 0.5, 
            duration: 0.4
        });
    }

    resize(width: number, height: number) {
        this.background.scale.set(width / 2, height / 2);

        this.label.fontSize = (height - 10);
        this.label.position.set(5, height / 2);
    }
}

export default HUDCategoryItem;