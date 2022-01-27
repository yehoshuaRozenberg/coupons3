import CouponDetails from "../model/CouponDetails";
import Customer from '../model/Customer';

export class CustomersState {
    public customer: Customer = new Customer();
}

export enum CustomerActionType {
    CustomerDetails = "CustomerDetails",
    PurchaseCoupon = "PurchaseCoupon",
}

export interface CustomerAction {
    type: CustomerActionType,
    payload?: any,
}

export function customerDetailsAction(customer: Customer): CustomerAction {
    return { type: CustomerActionType.CustomerDetails, payload: customer }
}

export function purchaseCouponAction(coupon: CouponDetails): CustomerAction {
    return { type: CustomerActionType.PurchaseCoupon, payload: coupon }
}

export function customersReduser(currentState: CustomersState = new CustomersState(), action: CustomerAction): CustomersState {
    const newState = { ...currentState };

    switch (action.type) {
        case CustomerActionType.CustomerDetails:
            newState.customer = action.payload
            break;
        case CustomerActionType.PurchaseCoupon:
            newState.customer.coupons.push(action.payload)
            break;
    }

    return newState;
}



