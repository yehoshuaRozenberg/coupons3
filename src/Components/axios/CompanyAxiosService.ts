import CouponDetails from "../model/CouponDetails";
import { companyDetailsAction, deleteCouponAction, getCouponsAction, updateCouponAction } from '../redux/companiesState';
import store from '../redux/store';
import globals from '../utils/Globals';
import jwtAxios from "./JWTAxios";


export async function addCouponAxios(coupon: CouponDetails) {
    await jwtAxios.post(globals.urls.company + "coupon/add", coupon)
        .then( (response) => {
            console.log(response.data);
            console.log("coupon added sucssfuly");
            companyCouponsAxios();
        })
        .catch(error => {
            console.log(error)
        });
}

export async function deleteCouponAxios(id: string) {
    const deleteUrl = globals.urls.company + "coupon/delete/" + id
    await jwtAxios.delete(deleteUrl).then((response) => {
        console.log(response.data);
        console.log("coupon added sucssfuly");
        store.dispatch(deleteCouponAction(id));
    })
        .catch(error => {
            console.log(error)
        });
}


export async function updateCouponAxios(coupon: CouponDetails) {
    await jwtAxios.post<CouponDetails>(globals.urls.company + "coupon/update", coupon)
        .then((response) => {
            console.log(response.data);
            store.dispatch(updateCouponAction(coupon))
        })
        .catch(error => {
            console.log(error)
        });

}

export async function companyDetailsAxios() {
    const url = globals.urls.company + "getDetails";
    console.log(url);
    await jwtAxios.post(url)
        .then(res => {
            store.dispatch(companyDetailsAction(res.data))
            console.log(store.getState().CompaniesState.company)
        })
        .catch(error => {
            console.log(error)
        });
}
export  function companyCouponsAxios() {
    console.log("in couponsAxios")
    const url = globals.urls.company + "coupon/getAll";
     jwtAxios.post(url)
        .then((res) => {
            console.log(res.data)
            store.dispatch(getCouponsAction(res.data));
            console.log(res.data)
        }
        )
        .catch((err) => {
            console.log("something was terrebliy wrong");
        })

}
