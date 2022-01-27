import { getAllCoupons } from "../axios/GuestAxiosService";
import Company from "../model/Company";
import CouponDetails from "../model/CouponDetails";

export class CompaniesState {
    public company: Company = new Company();
}

export enum CompanyActionType {
    CompanyDetails = "CompanyDetails",
    GetCoupons = "GetCoupons",
    DeleteCoupon = "DeleteCoupon",
    UpdateCoupon = "UpdateCoupon",
}

export interface CompanyAction {
    type: CompanyActionType,
    payload?: any,
}

export function companyDetailsAction(company: Company): CompanyAction {
    return { type: CompanyActionType.CompanyDetails, payload: company }
}

export function getCouponsAction(coupons: CouponDetails[]): CompanyAction {
    return { type: CompanyActionType.GetCoupons, payload: coupons }
}

export function deleteCouponAction(id: string): CompanyAction {
    return { type: CompanyActionType.DeleteCoupon, payload: id }
}

export function updateCouponAction(coupon: CouponDetails): CompanyAction {
    return { type: CompanyActionType.UpdateCoupon, payload: coupon }
}


export function companiesReducer(currentState: CompaniesState = new CompaniesState(), action: CompanyAction): CompaniesState {
    const newState = { ...currentState };

    switch (action.type) {
        case CompanyActionType.CompanyDetails:
            newState.company = action.payload
            break;
        case CompanyActionType.GetCoupons:
            newState.company.coupons =action.payload;
            getAllCoupons();
            break;
        case CompanyActionType.DeleteCoupon:
            newState.company.coupons.splice(newState.company.coupons.findIndex(item => item.id === parseInt(action.payload)), 1);
            getAllCoupons();
            break;
        case CompanyActionType.UpdateCoupon:
            newState.company.coupons[newState.company.coupons.findIndex(item => item.id == action.payload.id)] = action.payload;
            getAllCoupons();
            break;
    }

    return newState;
}


