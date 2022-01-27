import Company from "../model/Company";
import Customer from "../model/Customer";
import { addCompanyAction, addCustomerAction, companyDownloadedAction, customerDownloadedAction, deleteCompanyAction, deleteCustomerAction, updateCompanyAction, updateCustomerAction } from "../redux/adminState";
import store from "../redux/store";
import globals from "../utils/Globals";
import jwtAxios from "./JWTAxios";

//companies
export async function getAllCompaniesAxios() {
    await jwtAxios.post(globals.urls.administrator + "company/getAll")
        .then(res => {
            console.log("new data:\n" + res);
            store.dispatch(companyDownloadedAction(res.data))
        })
        .catch(err => {
            console.log(err);
        });
}

export async function addCompanyAxios(company: Company) {
    await jwtAxios.post(globals.urls.administrator + "company/add", company)
        .then((response) => {
            console.log("data arraived")
            console.log(response);
            store.dispatch(addCompanyAction(company))
        })
        .catch(error => {
            console.log(error.response)
        });

}

export async function updateCompanyAxios(company: Company) {
    await jwtAxios.post<Company>(globals.urls.administrator + "company/update", company)
        .then((response) => {
            console.log(response.data);
            store.dispatch(updateCompanyAction(company))
        })
        .catch(error => {
            console.log(error)
        });

}

export async function deleteCompanyAxios(id: string) {
    await jwtAxios.delete(globals.urls.administrator + "company/delete/:" + id)
        .then((res) => {
            console.log(res.data);
            store.dispatch(deleteCompanyAction(parseInt(id)))
        })
        .catch(error => {
            console.log(error)
        });

}


//customers
export async function getAllCustomersAxios() {
    await jwtAxios.post(globals.urls.administrator + "customer/getAll")
        .then(res => {
            console.log("new data:\n" + res);
            store.dispatch(customerDownloadedAction(res.data))
        })
        .catch(err => {
            console.log(err);
        });
}

export async function addCustomerAxios(customer: Customer) {
    await jwtAxios.post(globals.urls.administrator + "customer/add", customer)
        .then((response) => {
            console.log(response.data);
            store.dispatch(addCustomerAction(customer))
        })
        .catch(error => {
            console.log(error.response)
        });
}

export async function updateCustomerAxios(customer: Customer) {
    await jwtAxios.post<Customer>(globals.urls.administrator + "customer/update", customer)
        .then((response) => {
            console.log(response.data);
            store.dispatch(updateCustomerAction(customer));
        })
        .catch(error => {
            console.log(error)
        });
}

export async function deleteCustomerAxios(id: string) {
    await jwtAxios.delete(globals.urls.administrator + "customer/delete/:" + id)
        .then((res) => {
            console.log(res.data);
            store.dispatch(deleteCustomerAction(parseInt(id)))
        })
        .catch(error => {
            console.log(error)
        });

}

