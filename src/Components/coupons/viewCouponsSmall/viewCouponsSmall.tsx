import { useState, useEffect } from "react";
import CouponSmallCard from "../couponSmallCard/couponSmallCard";
import CouponDetails from "../../model/CouponDetails";
import store from "../../redux/store";
import "./viewCouponsSmall.css";


function ViewCouponsSmall(): JSX.Element {
    const [coupons, setData] = useState<CouponDetails[]>(store.getState().CouponsState.couponsForView);

    useEffect(() => {
        setData(store.getState().CouponsState.couponsForView);
        const unsubscribeMe = store.subscribe(() => setData(store.getState().CouponsState.couponsForView))
        return () => { unsubscribeMe(); }
    }, [])

    

    return (
        <div className="viewCouponsSmall">
            {coupons.map(item => <CouponSmallCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                image={item.image}
                discount= {item.discount}
                category={item.categoryID}
                amount={item.amount} />
            )}

        </div>
    );
}

export default ViewCouponsSmall;
