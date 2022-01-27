import { errorsReducer } from './ErrorState';
import { customersReduser } from './customersState';
import { adminReducer } from './adminState';
import { combineReducers, createStore } from "redux";
import { authReducer } from "./authState";
import { couponsReducer } from './couponsState';
import { applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { companiesReducer } from './companiesState';

const reducers = combineReducers({
    authState: authReducer,
    AdminState: adminReducer,
    CompaniesState: companiesReducer,
    CustomersState: customersReduser,
    CouponsState: couponsReducer,
    ErrorsState: errorsReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;
