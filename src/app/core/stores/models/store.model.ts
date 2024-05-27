import { IMarket } from "../../../pages/market/market.interface";

export interface ICart {
    price: number;
    quantity: number;
}

export interface IStore {
    asset: IMarket | {};
    cart: ICart
}
