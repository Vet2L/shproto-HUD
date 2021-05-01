import HUDObject from '../base/HUDObject';
import HUDGraphics from '../base/HUDGraphics';
import HUDText from '../base/HUDText';

import HUDCategories from './HUDCategories';
import HUDItemsContainer from './HUDItemsContainer';

const exampleData = require('./example_shopData.json')

class HUDShop extends HUDObject {
    // category list
    // -> category items
    // category container
    // -> concrete item

    background: HUDGraphics;
    categoryLabel: HUDText;
    categories: HUDCategories;
    hint: HUDText;

    items: HUDItemsContainer;

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
    }

    onCategorySelect(index: number){
        this.items.visible = true;
        this.hint.visible = false;

        this.items.setData(exampleData.categories[index].items);
    }

    onResize(width: number, height: number) {
        this.background.scale.set(width / 2, height / 2);

        this.categoryLabel.position.set(20, 20);

        this.categories.position.set(10, 55);
        this.categories.onResize(250, height - 65);

        this.hint.position.set(265, 60);

        this.items.position.set(265, 55);
        this.items.onResize(width - 270, height - 65);
    }
}

export default HUDShop;