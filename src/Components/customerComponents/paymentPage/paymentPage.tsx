import "./paymentPage.css";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import store from "../../redux/store";
import { useHistory } from "react-router";
import { purchaseCouponAxios } from "../../axios/CustomerAxiosService";
import LoginFC from "../../mainComponent/LoginFC/LoginFC";
import CouponDetails from "../../model/CouponDetails";
import { DeleteFromCartAction } from "../../redux/couponsState";

interface GetCoupon {
    id: string;
}



function PaymentPage(props: GetCoupon): JSX.Element {
    const [buy, setBuy] = useState<boolean>(store.getState().authState.userDetails.clientType == "Customers");
    let price = 0;
    if (props.id.includes("cart")) {
        price = store.getState().CouponsState.sumTotal;
    } else {
        const couponId = parseInt(props.id.replace(":", ""));
        price = store.getState().CouponsState.allCoupons.find(CouponDetails => CouponDetails.id == couponId).price;
    }



    useEffect(() => {
        const unsubscribeMe = store.subscribe(() => setBuy(store.getState().authState.userDetails.clientType == "Customers"));
        return () => { unsubscribeMe(); }
    }, []);



    async function purchase() {
        if (props.id.includes("cart")) {
            store.getState().CouponsState.cart.forEach(
                async (item) => { await purchaseCouponAxios(item); store.dispatch(DeleteFromCartAction(item.id)); })
        }
        else {
            const couponId = parseInt(props.id.replace(":", ""));
            await purchaseCouponAxios(store.getState().CouponsState.allCoupons.find(CouponDetails => CouponDetails.id == couponId));
        }
    }


    const login =
        <div>
            <b> logIn or register as client </b>
            <br /><br />
            <LoginFC />
        </div>

    const credit = <div>
        <h2> enter credit card details:</h2>
        number:_________________
        cvv:_________
        exp:___ ___
        name:________
        <br /><br />
        total: {price}$ <span>  </span>
        <Button type="submit" color="primary" variant="contained" onClick={purchase}> I want to buy it!! </Button>
    </div>

    return (
        <div className="purchaseCoupon">
            {!buy ? login : credit}
        </div>
    );
}

export default PaymentPage;