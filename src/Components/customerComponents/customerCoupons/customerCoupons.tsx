import "./customerCoupons.css";
import { Select, MenuItem, Button, ButtonGroup, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CouponDetails from "../../model/CouponDetails";
import store from "../../redux/store";
import { couponsForViewAction } from "../../redux/couponsState";
import ViewCouponsSmall from "../../coupons/viewCouponsSmall/viewCouponsSmall";
import { useHistory } from "react-router";


function CustomerCoupons(): JSX.Element {
    const [searchType, setType] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm<CouponDetails>();
    let history = useHistory();

    useEffect(() => {
        if (store.getState().authState.userDetails.clientType != "Customers") { history.push("/private/screen") }
        store.dispatch(couponsForViewAction(store.getState().CustomersState.customer.coupons));
    }, []);

    function typeSet(args: any) {
        setType(args.target.value);
        console.log(searchType);
    }

    function searchBy() {
        switch (searchType) {
            case "All":
                return <div></div>
            case "MaxPrice":
                return <div>
                    <TextField type="number" label="price" variant="outlined" {...register("price", {
                        required: { value: true, message: "this field is required" },
                        min: { value: 1, message: "minimum price is 1 NIS" },
                    })} />
                    <br />
                    <span className="errors"> {errors.price && <p>{errors.price.message}</p>}</span>

                </div>
            case "Category":
                return <div>
                    Category<br />
                    <Select style={{ width: 250 }} {...register("categoryID", {
                        required: { value: true, message: "this field is required" }
                    })}>
                        <MenuItem value={"FOOD"}>FOOD</MenuItem>
                        <MenuItem value={"ELECTRICITY"}>ELECTRICITY</MenuItem>
                        <MenuItem value={"RESTAURANT"}>RESTAURANT </MenuItem>
                        <MenuItem value={"VACATION"}>VACATION</MenuItem>
                        <MenuItem value={"HOME"}>HOME</MenuItem>
                        <MenuItem value={"CLOTHING"}>CLOTHING</MenuItem>
                    </Select>
                    <br />
                    <span className="errors"> {errors.categoryID && <p>{errors.categoryID.message}</p>}</span>

                </div>
        }
    }

    function search(couponFilter: CouponDetails) {
        console.log("couponFilter")
        console.log(couponFilter)
        const couponsInStore = store.getState().CustomersState.customer.coupons;
        switch (searchType) {
            case "All":
                store.dispatch(couponsForViewAction(couponsInStore));
                break;
            case "MaxPrice":
                store.dispatch(couponsForViewAction(couponsInStore.filter(coupon => coupon.price <= couponFilter.price)));
                break;
            case "Category":
                store.dispatch(couponsForViewAction(couponsInStore.filter(coupon => coupon.categoryID === couponFilter.categoryID)));
                break;
        }
    }

    return (

        <div className="customerCoupons">

            <Select style={{ width: 250 }} defaultValue="All" onChange={typeSet}  >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"MaxPrice"}>Max Price</MenuItem>
                <MenuItem value={"Category"}>Category </MenuItem>
            </Select>
            <form onSubmit={handleSubmit(search)}>

                {searchBy()}

                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary" >Search</Button>
                </ButtonGroup>

                <br />
            </form>

            <ViewCouponsSmall />
        </div>
    );
}

export default CustomerCoupons;



