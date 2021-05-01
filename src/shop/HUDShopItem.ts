import HUDObject from '../base/HUDObject';
import HUDText from '../base/HUDText';
import HUDGraphics from '../base/HUDGraphics';
import Point from '../base/Point';

import IShopItem from './IShopItem';

class HUDShopItem extends HUDObject {
    matrix: Point;
    size: Point;

    data: IShopItem;

    back: HUDGraphics;
    label: HUDText;
    price: HUDText;
    // label: text
    // price: container
    constructor(data: IShopItem){
        super();

        this.matrix = new Point();
        this.size = new Point();

        this.data = data;

        this.back = new HUDGraphics();
        this.addChild(this.back);
        this.back.fillStyle('#111111').drawRect(0, 0, 2, 2);
        this.back.alpha = 0.5;

        this.label = new HUDText(data.name, '#30abcf');
        this.label.fontSize = 30;
        this.addChild(this.label);
        this.label.anchor.set(0, 0.5);

        this.price = new HUDText(`${data.price}\$`, '#fcba03');
        this.addChild(this.price);
        this.price.anchor.set(0.5, 1);

        // this.price = new HUDShopItemPrice(data.price);
    }

    updateSize(width: number = 1, height: number = width){
        this.size.x = width;
        this.size.y = height;

        this.back.position.set(1.5);
        this.back.scale.set((width - 3) / 2, (height - 3) / 2);

        this.position.set(this.matrix.x * width, this.matrix.y * height);

        this.label.position.set(10, height/2);
        this.price.position.set(width/2, height - 10);
    }
}

export default HUDShopItem;