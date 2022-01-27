import { useEffect } from "react";
import store from "../../redux/store";
import "./customerDetails.css";
import { useHistory } from "react-router";


function CustomerDetails(): JSX.Element {
    let history = useHistory();
    let Customer1 = store.getState().CustomersState.customer;


    useEffect(() => {
        if (store.getState().authState.userDetails.clientType != "Customers") { history.push("/private/screen") }
    }, []);

    return (
        <div className="customerDetails">
            my details
            <div>

                id: {Customer1.id} <br />
                name: {Customer1.firstName} {Customer1.lastName}<br />
                email: {Customer1.email} <br />
                password: {Customer1.password} <br />
                <br /><br />

            </div>
        </div>
    );
}

export default CustomerDetails;
