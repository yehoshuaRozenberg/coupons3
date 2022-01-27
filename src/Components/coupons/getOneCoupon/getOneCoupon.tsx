import "./getOneCoupon.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CouponCard from "../couponCard/couponCard";
import store from "../../redux/store";
import CouponDetails from "../../model/CouponDetails";
import { fontSize } from "@mui/system";
import { getAllCoupons } from "../../axios/GuestAxiosService";


interface GetOneId {
    id: string;
}

function GetOneCoupon(props: GetOneId): JSX.Element {

    const [Coupon1, setData] = useState(new CouponDetails());
    const propId = parseInt(props.id.replace(":", ""));
    const [couponInRedux, setInRedux] = useState(store.getState().CouponsState.allCoupons.length != 0);
    let history = useHistory();

    useEffect(() => {
        console.log("in get one coupon")
        chekInRedux();
    }, []);



    async function chekInRedux() {
        console.log(couponInRedux);
        if (!couponInRedux) {
            await getAllCoupons();
            setData(store.getState().CouponsState.allCoupons.find(coupon => coupon.id == propId));
            setInRedux(true)
        }
        else{setData(store.getState().CouponsState.allCoupons.find(coupon => coupon.id == propId));
        }
    }

    const card = <div>
        <div style={{ fontSize: 70 }}> page in production</div>
        <h2>Coupon{props.id} details</h2><br />
        <div className="center">
            {<CouponCard
                id={Coupon1.id}
                companyID={Coupon1.companyID}
                categoryID={Coupon1.categoryID}
                title={Coupon1.title}
                startDate={Coupon1.startDate.toString()}
                endDate={Coupon1.endDate.toString()}
                description={Coupon1.description}
                amount={Coupon1.amount}
                price={Coupon1.price}
                image={Coupon1.image} />}
        </div>
        <input type="button" value="back" onClick={() => history.go(-1)} />
    </div>

    return (
        <div className="getOneCoupon" >
            {couponInRedux && card}

        </div>
    );
}

export default GetOneCoupon;
