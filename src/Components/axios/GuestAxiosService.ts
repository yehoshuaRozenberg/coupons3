import axios from "axios";
import Company from "../model/Company";
import Customer from "../model/Customer";
import { couponsDownloadedAction } from "../redux/couponsState";
import store from "../redux/store";
import globals from "../utils/Globals";
import notify from "../utils/Notify";

export async function getAllCoupons() {
    await axios.post(globals.urls.guest + "coupons/get")
        .then(res => {
            console.log("new data:\n" + res);
            store.dispatch(couponsDownloadedAction(res.data))
        })
        .catch(err => {
            console.log(err);
        });
}

export async function registerCustomerAxios(customer: Customer) {
    await axios.post(globals.urls.guest + "register/customer", customer)
        .then(async (response) => {
            console.log(response.data);
            notify.success(response.data);
        })
        .catch(err => {
            console.log(err.response.data.description);
            notify.error(err.response.data.description)

        });

}

export async function registerCompanyAxios(company: Company) {
    await axios.post(globals.urls.guest + "register/company", company)
        .then(async (response) => {
            console.log(response.data);
            notify.success(response.data);
        })
        .catch(err => {
            console.log(err.response.data.description);
            notify.error(err.response.data.description)

        });

}
