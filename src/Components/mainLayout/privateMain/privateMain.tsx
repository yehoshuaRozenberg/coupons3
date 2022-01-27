import { useEffect } from "react";
import ViewCouponsSmall from "../../coupons/viewCouponsSmall/viewCouponsSmall";
import { couponsForViewAction } from "../../redux/couponsState";
import store from "../../redux/store";
import "./privateMain.css";

function PrivateMain(): JSX.Element {

    const imgCart = "https://firebasestorage.googleapis.com/v0/b/better-life-coupons.appspot.com/o/cart.jpg?alt=media&token=3d053cc0-a09b-438a-82f4-0181be0302a9"

    useEffect(() => {
        store.dispatch(couponsForViewAction(store.getState().CouponsState.allCoupons))
        console.log("in main")
    }, []);


    switch (store.getState().authState.userDetails.clientType) {
        case "Administrator":
            return (
                <div className="privateMain">
                      <img src={imgCart}></img>

                    Wellcom Admin <br /><br />
                    this is your private area  <br />
in this area you can add, edit and delit customer or company  <br /> 
you can also to view their coupons, details and password <br />
                    what wold you like to do? <br />
                    (to help- contact us in contact us bouton in "about" page)
                  
                </div>
            );
            break;

        case "Companies":
            return (
                <div className="privateMain">
                      <img src={imgCart}></img>

                    Wellcom {store.getState().CompaniesState.company.name} <br /><br />

this is your private area <br />
in this area you can add, edit and delit your coupons  <br />
what wold you like to do? <br />
(to help- contact us in contact us bouton in "about" page)


                </div>
            );
            break;

        case "Customers":
            return (
                <div className="privateMain">
                    wellcome {store.getState().CustomersState.customer.firstName} {store.getState().CustomersState.customer.lastName} <br /><br />
                    this is your private area <br />
                    in this area you can purchase coupons, view your coupons, your cart, and your details <br />
                    what wold you like to do?

                    <ViewCouponsSmall />

                </div>
            );
            break;

        default:
            return (
                <div>
                </div>

            )
    }

}

export default PrivateMain;
