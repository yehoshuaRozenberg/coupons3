
import { useEffect, useState } from "react";
import { getAllCoupons } from "../../axios/GuestAxiosService";
import ViewCouponsSmall from "../../coupons/viewCouponsSmall/viewCouponsSmall";
import { couponsForViewAction } from "../../redux/couponsState";
import store from "../../redux/store";
import "./getCoupons.css";


function GetCoupons(): JSX.Element {
    const[ready,setReady]= useState(false);

    useEffect(() => {
        syncSetData();
    }, []);

    async function syncSetData() {
        console.log(store.getState().CouponsState.allCoupons)
        //if (store.getState().CouponsState.allCoupons.length==0){
         await getAllCoupons();
        //}
        store.dispatch(couponsForViewAction(store.getState().CouponsState.allCoupons))
        setReady(true);
    }


    return (
        <div className="getCoupons">
            {ready&&<ViewCouponsSmall/>}

        </div>
    );
}

export default GetCoupons;


