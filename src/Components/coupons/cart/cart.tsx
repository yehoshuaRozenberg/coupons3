import { Button, ButtonGroup } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { couponsForViewAction, DeleteFromCartAction } from "../../redux/couponsState";
import store from "../../redux/store";
import ViewCouponsSmall from "../viewCouponsSmall/viewCouponsSmall";
import "./cart.css";

function Cart(): JSX.Element {
    let history = useHistory();
    let type = store.getState().authState.userDetails.clientType
    const [totalPrice, setTotal]= useState<number>(store.getState().CouponsState.sumTotal)


    useEffect(() => {
        store.dispatch(couponsForViewAction(store.getState().CouponsState.cart));
        const unsubscribeMe = store.subscribe(() =>  setTotal(store.getState().CouponsState.sumTotal));
        return () => { unsubscribeMe(); }
    }, []);




   

    return (
        <div className="cart">
            my cart
            <br /><br />
            total price: {totalPrice}$  
            <Button type="submit" color="primary" onClick={() => type === "" ?
                history.push("/coupon/payment/:" + "cart") : history.push("/private/screen/customer/coupon/payment/:" + "cart")
            } variant="outlined" size="small">Buy all now</Button>


            <ViewCouponsSmall />

        </div>
    );
}

export default Cart;

