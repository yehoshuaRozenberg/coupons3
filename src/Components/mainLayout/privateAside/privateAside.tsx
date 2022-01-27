import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import store from "../../redux/store";
import "./privateAside.css";

function PrivateAside(): JSX.Element {

    let history = useHistory();
    function ADcompanies() { history.push("/private/screen/admin/companies") }
    function ADcustomers() { history.push("/private/screen/admin/customers") }
    

    function CPcopAdd() { history.push("/private/screen/company/coupon/add") }
    function CPdetails() { history.push("/private/screen/company/details") }
    function CPcoupons() { history.push("/private/screen/company/coupons") }

    function CSpurchase() { history.push("/private/screen/customer/purchase") }
    function CSdetails() { history.push("/private/screen/customer/details") }
    function CScoupons() { history.push("/private/screen/customer/coupons") }
    function CScart() { history.push("/private/screen/customer/cart") }


    switch (store.getState().authState.userDetails.clientType) {
        case "Administrator":
            return (
                <div className="privateAside">
                    admin main menu <br /><hr />
                    <Button type="submit" color="primary" onClick={ADcompanies} variant="contained" fullWidth>Companies</Button>
                    <Button type="submit" color="primary" onClick={ADcustomers} variant="contained" fullWidth>Customers</Button>

                </div>
            );
          
        case "Companies":
            return (
                <div className="privateAside">
                    {store.getState().CompaniesState.company.name} main menu <br /><hr />
                    <Button type="submit" color="primary" onClick={CPcopAdd} variant="contained" fullWidth>Add Coupon</Button>
                    <Button type="submit" color="primary" onClick={CPcoupons} variant="contained" fullWidth>MY Coupons</Button>
                    <Button type="submit" color="primary" onClick={CPdetails} variant="contained" fullWidth>View my details</Button>
                </div>
            );
        

        case "Customers":
            return (
                <div className="privateAside">
                    {store.getState().CustomersState.customer.firstName} {store.getState().CustomersState.customer.lastName} main menu <br /><hr />
                    <Button type="submit" color="primary" onClick={CScart} variant="contained" fullWidth>My Cart</Button>
                    <Button type="submit" color="primary" onClick={CSpurchase} variant="contained" fullWidth>purchase Coupons</Button>
                    <Button type="submit" color="primary" onClick={CScoupons} variant="contained" fullWidth>MY Coupons</Button>
                    <Button type="submit" color="primary" onClick={CSdetails} variant="contained" fullWidth>View my details</Button>
                </div>
            );
          
        default:
            return (
                <div>

                </div>

            )
    }

}

export default PrivateAside;


