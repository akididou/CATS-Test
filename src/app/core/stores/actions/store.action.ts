import { IMarket } from "../../../pages/market/market.interface";
import { ICart } from "../models/store.model";

export class SetAsset {
    static readonly type = '[CONFIGURATION] Set Asset';
    constructor(
        public asset: IMarket
    ) {
    }
}

export class SetCart {
    static readonly type = '[CONFIGURATION] Set Cart';
    constructor(
        public cart: ICart
    ) {
    }
}