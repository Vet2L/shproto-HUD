import HUDObject from '../base/HUDObject';
import HUDGraphics from '../base/HUDGraphics';
import HUDCategoryItem from './HUDCategoryItem';

import IShopCategory from './IShopCategory';

class HUDCategories extends HUDObject {
    background: HUDGraphics;

    items: Array<HUDCategoryItem>;

    constructor(data: Array<IShopCategory> = []){
        super();

        this.items = [];

        this.background = new HUDGraphics();
        this.background.fillStyle('#111111').drawRect(0, 0, 2, 2);
        this.background.alpha = 0.5;
        this.addChild(this.background);

        this.setData(data);
    }

    setData(data: Array<IShopCategory>){
        this.removeData();
        console.log(data);

        for (let i = 0; i < data.length; ++i) {
            let category = new HUDCategoryItem(data[i]);
            this.addChild(category);
            this.items.push(category);
        }
    }

    removeData(){
        for (let i = 0; i < this.items.length; ++i) {
            this.removeChild(this.items[i]);
        };

        this.items = [];
    }

    onResize(width: number, height: number) {
        this.background.scale.set(width / 2, height / 2);

        for (let i = 0; i < this.items.length; ++i) {
            this.items[i].resize(width - 10, 40);
            this.items[i].position.set(5, 45*i + 5);
        }
    }
}

export default HUDCategories;