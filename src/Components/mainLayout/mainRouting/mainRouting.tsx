import { useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Main from "../../guestComponents/main/main";
import About from "../../mainComponent/about/about";
import GetOneCoupon from "../../coupons/getOneCoupon/getOneCoupon";
import LoginFC from "../../mainComponent/LoginFC/LoginFC";
import Page404 from "../../mainComponent/page404/page404";
import { error404Action } from "../../redux/ErrorState";
import store from "../../redux/store";
import PrivateScreen from "../privateScreen/privateScreen";
import "./mainRouting.css";
import PaymentPage from "../../customerComponents/paymentPage/paymentPage";
import { getAllCoupons } from "../../axios/GuestAxiosService";
import Cart from "../../coupons/cart/cart";

function MainRouting(): JSX.Element {
    //    const [ClientType, setType] = useState(store.getState().authState.userDetails.clientType);
    const [Error404, set404] = useState(store.getState().ErrorsState.error404);
    let history = useHistory();

    useEffect(() => {
        const error404unsubscribeMe = store.subscribe(() => set404(store.getState().ErrorsState.error404));
        return () => { error404unsubscribeMe(); }
    }, []);

    function chek404() {
        if (Error404 == true) {
            history.push("/page404")
            store.dispatch(error404Action(false))
        }
    }


    return (
        <div className="mainRouting">
            {chek404()}
            <Switch>

                <Route path="/guest/main" component={Main} exact />
                <Route path="/private/screen" component={PrivateScreen} />
                {/* <Route path= `/private/screen/customer/cart` component={Cart} exact/>  */}
                <Route path="/login" component={LoginFC} exact />
                <Route path="/about" component={About} exact />
                <Route path="/page404" component={Page404} exact />
                <Route path="/cart" component={Cart} exact />
                <Route path="/coupon/getOne/:id" render={(props) => <GetOneCoupon id={props.match.params.id} />} exact />
                <Route path="/coupon/payment/:id" render={(props) => <PaymentPage id={props.match.params.id} />} exact />
                <Redirect from="/" to="/guest/main" exact />

                <Route component={Page404} />
            </Switch>


        </div>
    );
}

export default MainRouting;
