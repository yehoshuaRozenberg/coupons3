import Company from "../model/Company";
import Customer from "../model/Customer";

export class AdminState {
    public companies: Company[] = [];
    public customers: Customer[] = [];
}

export enum AdminActionType {
    CompaniesDownload = "CompaniesDownloaded",
    AddCompany = "AddCompany",
    UpdateCompany = "UpdateCompany",
    DeleteCompany = "DeleteCompany",
    CustomersDownload = "CustomersDownloaded",
    AddCustomer = "AddCustomer",
    UpdateCustomer = "UpdateCustomer",
    DeleteCustomer = "DeleteCustomer",
}

export interface AdminAction {
    type: AdminActionType,
    payload?: any,
}

export function companyDownloadedAction(companies: Company[]): AdminAction {
    return { type: AdminActionType.CompaniesDownload, payload: companies }
}

export function addCompanyAction(company: Company): AdminAction {
    return { type: AdminActionType.AddCompany, payload: company }
}

export function updateCompanyAction(company: Company): AdminAction {
    return { type: AdminActionType.UpdateCompany, payload: company }
}

export function deleteCompanyAction(id: number): AdminAction {
    return { type: AdminActionType.DeleteCompany, payload: id }
}

export function customerDownloadedAction(customers: Customer[]): AdminAction {
    return { type: AdminActionType.CustomersDownload, payload: customers }
}

export function addCustomerAction(customer: Customer): AdminAction {
    return { type: AdminActionType.AddCustomer, payload: customer }
}

export function updateCustomerAction(customer: Customer): AdminAction {
    return { type: AdminActionType.UpdateCustomer, payload: customer }
}

export function deleteCustomerAction(id: number): AdminAction {
    return { type: AdminActionType.DeleteCustomer, payload: id }
}


export function adminReducer(currentState: AdminState = new AdminState(), action: AdminAction): AdminState {
    const newState = { ...currentState };

    switch (action.type) {
        case AdminActionType.CompaniesDownload:
            newState.companies = action.payload;
            break;
        case AdminActionType.AddCompany:
            newState.companies.push(action.payload);
            break;
        case AdminActionType.UpdateCompany:
            newState.companies[newState.companies.findIndex(item => item.id == action.payload.id)] = action.payload;
            break;
        case AdminActionType.DeleteCompany:
            newState.companies.splice(newState.companies.findIndex(item => item.id === parseInt(action.payload)), 1);
            break;
        case AdminActionType.CustomersDownload:
            newState.customers = action.payload;
            break;
        case AdminActionType.AddCustomer:
            newState.customers.push(action.payload);
            break;
        case AdminActionType.UpdateCustomer:
            newState.customers[newState.customers.findIndex(item => item.id == action.payload.id)] = action.payload;
            break;
        case AdminActionType.DeleteCustomer:
            newState.customers.splice(newState.customers.findIndex(item => item.id === parseInt(action.payload)), 1);
            break;

    }

    return newState;
}


