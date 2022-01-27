import { useHistory } from "react-router-dom";
import store from "../../redux/store";
import GetCoupons from "../getCoupons/getCoupons";
import "./main.css";

function Main(): JSX.Element {
const history = useHistory();

    return (
        <div className="main center">
            {/* {console.log(store.getState().CouponsState.cart)} */}
            {console.log(history.location.pathname)}
            <GetCoupons />
        </div>
    );
}

export default Main;

