import HUDObject from '../base/HUDObject';
import HUDGraphics from '../base/HUDGraphics';
import HUDText from '../base/HUDText';

import HUDCategories from './HUDCategories';
import HUDItemsContainer from './HUDItemsContainer';

import { gsap } from 'gsap';

// const exampleData = require('./example_shopData.json');
let exampleData = require('./example_shopCategories.json');

class HUDShop extends HUDObject {
    background: HUDGraphics;
    categoryLabel: HUDText;
    categories: HUDCategories;
    hint: HUDText;

    items: HUDItemsContainer;

    currentCategory: number = -1;

    isShow: boolean = false;
    isLocked: boolean = false;

    constructor(){
        super();

        this.background = new HUDGraphics();
        this.background.fillStyle('#111111');
        this.background.drawRect(0, 0, 2, 2);
        this.background.alpha = 0.5;
        this.addChild(this.background);

        this.categoryLabel = new HUDText('Category:', '#ffffff');
        this.addChild(this.categoryLabel);

        this.categories = new HUDCategories(exampleData.categories);
        this.addChild(this.categories);

        this.hint = new HUDText('Select category in list to continue...', '#ffffff');
        this.addChild(this.hint);

        this.items = new HUDItemsContainer();
        this.addChild(this.items);
        this.items.visible = false;

        this.visible = false;
    }

    show(){
        if (this.isLocked) { return; }
        this.visible = true;

        this.alpha = 0;
        this.categories.scale.set(0, 1);

        gsap.to(this, {
            alpha: 1,
            duration: 0.4
        });
        gsap.to(this.categories.scale, {
            x: 1,
            duration: 0.4,
            onComplete: ()=>{
                this.onShow();
            }
        });

        this.isShow = true;
        this.isLocked = true;
    }

    onShow(){
        this.isLocked = false;
    }

    hide(){
        if (this.isLocked) { return ; }

        this.isShow = false;

        gsap.to(this, {
            alpha: 0,
            duration: 0.4
        });
        gsap.to(this.categories.scale, {
            x: 0,
            duration: 0.4,
            onComplete: ()=>{
                this.onHide();
            }
        });

        this.onCategoryBack();
    }

    onHide(){
        this.isLocked = false;
    }

    toggle(){
        this.isShow ? this.hide() : this.show();
    }

    onKeyDown(keyCode: number){
        if (this.isLocked) { return ;}
        if (!this.isShow) { return ;}

        if (keyCode > 48 && keyCode < 58) { // "1" - "9"
            if (this.currentCategory >= 0) {
                // buy item
                if (this.items.onItemBuy(keyCode - 49)) {
                    this.isLocked = true;
                    gsap.to({timer: 0}, {
                        timer: 1,
                        duration: 0.5,
                        onComplete: ()=>{
                            this.isLocked = false;
                            this.hide();
                        }
                    });

                    exampleData.categories[this.currentCategory].items.splice(keyCode - 49, 1);
                }
            } else {
                this.onCategorySelect(keyCode - 49);
            }
        }
        if (keyCode === 27) { // "ESC"
            if (this.currentCategory >= 0) {
                this.onCategoryBack();
            } else {
                this.hide();
            }
        }
    }

    onCategorySelect(index: number){
        if (!exampleData.categories[index]) { return; }

        this.items.visible = true;
        this.hint.visible = false;

        this.items.setData(exampleData.categories[index].items);
        this.categories.onFocus(index);

        this.currentCategory = index;

        this.items.alpha = 0;
        this.items.scale.y = 0;

        gsap.to(this.items, {
            alpha: 1,
            duration: 0.4
        });
        gsap.to(this.items.scale, {
            y: 1,
            duration: 0.4
        });
    }

    onCategoryBack(){
        // this.items.visible = false;
        this.hint.visible = true;

        this.currentCategory = -1;
        this.categories.resetFocus();

        // this.items.alpha = 0;
        // this.items.scale.y = 0;

        gsap.to(this.items, {
            alpha: 0,
            duration: 0.4
        });
        gsap.to(this.items.scale, {
            y: 0,
            duration: 0.4
        });
    }

    onResize(width: number, height: number) {
        this.background.scale.set(width / 2, height / 2);

        this.categoryLabel.position.set(20, 20);

        this.categories.position.set(10, 55);
        this.categories.onResize(250, height - 65);
        // this.categories.position.set(10, 55 + (height - 65) / 4);
        // this.categories.onResize(250, (height - 65) / 2);

        this.hint.position.set(265, 60);

        this.items.position.set(265, 55);
        this.items.onResize(width - 270, height - 65);
    }
}

export default HUDShop;