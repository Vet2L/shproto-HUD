import IShopItem from './IShopItem';

interface IShopCategory {
    name: string;
    items: Array<IShopItem>
}

export default IShopCategory;