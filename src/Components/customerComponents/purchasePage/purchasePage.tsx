import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ViewCouponsSmall from "../../coupons/viewCouponsSmall/viewCouponsSmall";
import CouponDetails from "../../model/CouponDetails";
import { couponsForViewAction } from "../../redux/couponsState";
import store from "../../redux/store";
import "./purchasePage.css";

function PurchasePage(): JSX.Element {
    let couponsArray : CouponDetails[]= [];
    store.getState().CouponsState.allCoupons.map((item)=>{couponsArray.push(item)});
    let customerCoupons = store.getState().CustomersState.customer.coupons;
    let history = useHistory();
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if (store.getState().authState.userDetails.clientType != "Customers") { history.push("/private/screen") }

      
        customerCoupons.map((myCoupon) => {
            let index = couponsArray.findIndex(item => item.id === myCoupon.id);
            if (index != -1) { couponsArray.splice(index, 1); }
         } )

        store.dispatch(couponsForViewAction(couponsArray));
        setReady(true);

    }, []);


    return (
        <div className="purchasePage">
            coupons you can purchase
            {ready && <ViewCouponsSmall />}
        </div>
    );
}

export default PurchasePage;
