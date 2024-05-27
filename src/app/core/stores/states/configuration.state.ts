import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ICart, IStore } from '../models/store.model';
import { IMarket } from '../../../pages/market/market.interface';
import { SetAsset, SetCart } from '../actions/store.action';

export class StoreStateModel {
    store: IStore = {
        asset: {},
        cart: {
            quantity: 0,
            price: 0
        }
    };
}

@State<StoreStateModel>({
    name: 'storeState',
    defaults: {
        store: {
            asset: {},
            cart: {
                quantity: 0,
                price: 0
            }
        },
    },
})

@Injectable()

export class StoreState {

    @Selector()
    static getAsset(state: StoreStateModel): IMarket | {} {
        return state.store.asset;
    }

    @Selector()
    static getCart(state: StoreStateModel): ICart {
        return state.store.cart;
    }


    @Action(SetAsset)
    setAsset({ getState, patchState }: StateContext<StoreStateModel>, { asset }: SetAsset): void {
        {
            patchState({
                store: {
                    ...getState().store,
                    asset
                }
            })
        }
    }

    @Action(SetCart)
    setPrice({ getState, patchState }: StateContext<StoreStateModel>, { cart }: SetCart): void {
        {
            patchState({
                store: {
                    ...getState().store,
                    cart
                }
            })
        }
    }
}
