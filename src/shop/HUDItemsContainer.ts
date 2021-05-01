import HUDObject from '../base/HUDObject';
import HUDGraphics from '../base/HUDGraphics';

import HUDShopItem from './HUDShopItem';
import IShopItem from './IShopItem';

class HUDItemsContainer extends HUDObject{
    background: HUDGraphics;

    maxWidth: number = 0;
    maxHeight: number = 0;

    cols: number = 3;

    items: Array<HUDShopItem>;

    constructor(){
        super();

        this.items = [];

        this.background = new HUDGraphics();
        this.addChild(this.background);
        this.background.fillStyle('#000000').drawRect(0, 0, 2, 2);
        this.background.alpha = 0.5;
    }

    setData(data: Array<IShopItem>){
        this.removeData();

        for (let i = 0; i < data.length; ++i) {
            let item = new HUDShopItem(data[i]);
            this.items.push(item);
            this.addChild(item);
        }

        this.updateItemsPositions();
    }

    removeData(){
        for (let i = 0; i < this.items.length; ++i) {
            this.removeChild(this.items[i]);
        };

        this.items = [];
    }

    updateItemsPositions(){
        let x = 0;
        let y = 0;
        for (let i = 0; i < this.items.length; ++i) {
            this.items[i].matrix.set(x, y);
            this.items[i].updateSize(this.maxWidth / this.cols);
            x++;
            if (x >= this.cols) {
                x = 0;
                y++;
            }
        }
    }

    onResize(width: number, height: number) {
        this.background.scale.set(width / 2, height / 2);

        this.maxWidth = width;
        this.maxHeight = height;
    }
}

export default HUDItemsContainer;