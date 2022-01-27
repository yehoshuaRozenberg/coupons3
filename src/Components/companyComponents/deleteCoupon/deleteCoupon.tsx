import { useHistory } from "react-router";
import { deleteCouponAxios } from "../../axios/CompanyAxiosService";
import "./deleteCoupon.css";
import { useEffect } from "react";
import store from "../../redux/store";


interface DeleteId {
    id: string;
}

function DeleteCoupon(props: DeleteId): JSX.Element {
    let history = useHistory();

    useEffect(() => {
        if (store.getState().authState.userDetails.clientType != "Companies") { history.push("/private/screen") }
    }, []);


    async function deleteCoupon() {
        await deleteCouponAxios(props.id);
        history.push("/company/coupon/getAll")
    }
    return (
        <div className="deleteCoupon smallBox">
            <h2>are you sure you want to delete this coupon?</h2>
            <input type="button" value="yes, i want to delete it" onClick={deleteCoupon} />
            <input type="button" value="cancel" onClick={() => history.go(-1)} />

        </div>
    );
}

export default DeleteCoupon;
