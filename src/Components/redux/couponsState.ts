import CouponDetails from "../model/CouponDetails";
import notify from "../utils/Notify";

export class CouponsState {
    public allCoupons: CouponDetails[] = [];
    public couponsForView: CouponDetails[] = [];
    public cart: CouponDetails[] = [];
    public sumTotal: number = 0;

}

export enum CouponsActionType {
    CouponsDownload = "CouponsDownloaded",
    CouponsForView = "CouponsForView",
    AddToCart = "AddToCart",
    DeleteFromCart = "DeleteFromCart",
    CartSum = "CartSum"
}


export interface CouponsAction {
    type: CouponsActionType,
    payload?: any,
}

export function couponsDownloadedAction(coupons: CouponDetails[]): CouponsAction {
    return { type: CouponsActionType.CouponsDownload, payload: coupons }
}

export function couponsForViewAction(coupons: CouponDetails[]): CouponsAction {
    return { type: CouponsActionType.CouponsForView, payload: coupons }
}

export function AddToCartAction(coupon: CouponDetails): CouponsAction {
    return { type: CouponsActionType.AddToCart, payload: coupon }
}

export function DeleteFromCartAction(id: number): CouponsAction {
    return { type: CouponsActionType.DeleteFromCart, payload: id }
}

export function CartSum(sum: number): CouponsAction {
    return { type: CouponsActionType.CartSum, payload: sum }
}

export function couponsReducer(currentState: CouponsState = new CouponsState(), action: CouponsAction): CouponsState {
    const newState = { ...currentState };
    switch (action.type) {
        case CouponsActionType.CouponsDownload:
            newState.allCoupons = action.payload;
            break;
        case CouponsActionType.CouponsForView:
            newState.couponsForView = action.payload;
            break;
        case CouponsActionType.AddToCart:
              if (newState.cart.findIndex(item => item.id == action.payload.id) == -1) {
                newState.cart.push(action.payload);
                newState.sumTotal+=action.payload.price;
                notify.success("coupon added to your cart");
            }
            else { notify.error("coupon already exists in your cart") }
            break;
        case CouponsActionType.DeleteFromCart:
            //  if (newState.cart.findIndex(item => item.id == action.payload) != -1) {
                newState.sumTotal -=newState.cart[newState.cart.findIndex(item => item.id == action.payload)].price;
                newState.cart.splice(newState.cart.findIndex(item => item.id == action.payload), 1);
               // notify.success("coupon removed from your cart");
                //  }
            break;
        case CouponsActionType.CartSum:
            newState.sumTotal = action.payload;
    }

    return newState;
}


