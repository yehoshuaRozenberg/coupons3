import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AddCompany from "../../adminComponents/addCompany/addCompany";
import AddCustomer from "../../adminComponents/addCustomer/addCustomer";
import AddCoupon from "../../companyComponents/addCoupon/addCoupon";
import DeleteCoupon from "../../companyComponents/deleteCoupon/deleteCoupon";
import UpdateCoupon from "../../companyComponents/updateCoupon/updateCoupon";
import CompanyDetails from "../../companyComponents/companyDetails/companyDetails";
import CustomerDetails from "../../customerComponents/customerDetails/customerDetails";
import GetOneCoupon from "../../coupons/getOneCoupon/getOneCoupon";
import ViewCouponsSmall from "../../coupons/viewCouponsSmall/viewCouponsSmall";
import PrivateMain from "../privateMain/privateMain";
import PaymentPage from "../../customerComponents/paymentPage/paymentPage";
import CompanyCoupons from "../../companyComponents/companyCoupons/companyCoupons";
import CustomerCoupons from "../../customerComponents/customerCoupons/customerCoupons";
import AdminCustomers from "../../adminComponents/adminCustomers/adminCustomers";
import AdminCompanies from "../../adminComponents/adminCompanies/adminCompanies";
import PurchasePage from "../../customerComponents/purchasePage/purchasePage";
import LoginFC from "../../mainComponent/LoginFC/LoginFC";
import Cart from "../../coupons/cart/cart";


class PrivateRouting extends Component {

    public render(): JSX.Element {

        return (
            <div className="privateRouting">


                <Switch >
                    <Route
                        path="/private/screen"
                        render={({ match: { url } }) => (
                            <>
                                <Route path={`${url}/`} component={PrivateMain} exact />

                                {/* admin */}
                                <Route path={`${url}/admin/companies`} component={AdminCompanies} />
                                <Route path={`${url}/admin/customers`} component={AdminCustomers} />
                                <Route path={`${url}/admin/company/add`} component={AddCompany} />
                                <Route path={`${url}/admin/customer/add`} component={AddCustomer} />

                                {/* company */}
                                <Route path={`${url}/company/coupon/delete/:id`} render={(props) => <DeleteCoupon id={props.match.params.id} />} />
                                <Route path={`${url}/company/coupon/add`} component={AddCoupon} />
                                <Route path={`${url}/company/coupon/update/:id`} render={(props) => <UpdateCoupon id={props.match.params.id} />} />
                                <Route path={`${url}/company/details`} component={CompanyDetails} />
                                <Route path={`${url}/company/coupons`} component={CompanyCoupons} />

                                {/* customer */}
                                <Route path={`${url}/customer/details`} component={CustomerDetails} />
                                <Route path={`${url}/customer/purchase`} component={PurchasePage} />
                                <Route path={`${url}/customer/coupon/payment/:id`} render={(props) => <PaymentPage id={props.match.params.id} />} />
                                <Route path={`${url}/customer/coupons`} component={CustomerCoupons} />
                                <Route path={`${url}/customer/cart`} component={Cart} exact />

                                {/* general */}
                                <Route path={`${url}/coupons/view`} component={ViewCouponsSmall} />
                                <Route path={`${url}/coupon/getOne/:id`} render={(props) => <GetOneCoupon id={props.match.params.id} />} />
                                <Route path={`${url}/login`} component={LoginFC} exact />
                            </>
                        )}
                    />
                </Switch>
            </div>
        );
    }
}

export default PrivateRouting;
