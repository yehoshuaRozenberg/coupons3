import CouponDetails from "../model/CouponDetails";
import { customerDetailsAction, purchaseCouponAction } from '../redux/customersState';
import store from '../redux/store';
import globals from '../utils/Globals';
import { getAllCoupons } from './GuestAxiosService';
import jwtAxios from "./JWTAxios";


export async function customerDetailsAxios() {
    const url = globals.urls.customer + "getDetails";
    await jwtAxios.post(url).then(async (res) => {
        store.dispatch(customerDetailsAction(res.data));
        console.log("got customer details:")
        console.log(res.data)
        console.log(store.getState().CustomersState.customer)
        // if (store.getState().CouponsState.allCoupons.length==0){
            await getAllCoupons();//}

    }
    )
        .catch(err => {
            console.log(err)
        })
}

export async function purchaseCouponAxios(coupon: CouponDetails) {
    await jwtAxios.post(globals.urls.customer + "coupon/purchase", coupon)
        .then((response) => {
            console.log(response.data);
            console.log("coupon purchase secsfuly")
            store.dispatch(purchaseCouponAction(coupon))

        })
        .catch(error => {
            console.log(error);
        });

}

