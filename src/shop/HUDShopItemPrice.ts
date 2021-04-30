import HUDObject from '../base/HUDObject';
import HUDText from '../base/HUDText';
import HUDGraphics from '../base/HUDGraphics';

import IShopItem from './IShopItem';

class HUDShopItemPrice extends HUDObject {
    coin: HUDGraphics;
    price: HUDText;

    constructor(item: IShopItem){
        super();

        this.price = new HUDText(`${item.price}`);
    }
}

export default HUDShopItemPrice;