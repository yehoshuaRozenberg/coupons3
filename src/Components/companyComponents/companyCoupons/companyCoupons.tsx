import { Select, MenuItem, Button, ButtonGroup, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CouponDetails from "../../model/CouponDetails";
import store from "../../redux/store";
import "./companyCoupons.css";
import { couponsForViewAction } from "../../redux/couponsState";
import ViewCouponsSmall from "../../coupons/viewCouponsSmall/viewCouponsSmall";
import { useHistory } from "react-router";


function CompanyCoupons(): JSX.Element {
    const [searchType, setType] = useState("");
    const { register, handleSubmit, setError, formState: { errors } } = useForm<CouponDetails>();
    let history = useHistory();


    useEffect(() => {
        if (store.getState().authState.userDetails.clientType != "Companies") { history.push("/private/screen") }
        store.dispatch(couponsForViewAction(store.getState().CompaniesState.company.coupons));
    }, []);


    function typeSet(args: any) {
        setType(args.target.value);
        console.log(searchType);
    }

    function searchBy() {
        switch (searchType) {
            case "All":
                return <div></div>
            case "Id":
                return <div>
                    <TextField type="number" label="id" variant="outlined" {...register("id", {
                        required: { value: true, message: "this field is required" },
                    })} />
                    <br />
                    <span className="errors"> {errors.price && <p>{errors.price.message}</p>}</span>

                </div>
            case "MaxPrice":
                return <div>
                    <TextField type="number" label="price" variant="outlined" {...register("price", {
                        required: { value: true, message: "this field is required" },
                        min: { value: 0, message: "minimum price is 0 NIS" },
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
        const couponsInStore = store.getState().CompaniesState.company.coupons;
        switch (searchType) {
            case "All":
                store.dispatch(couponsForViewAction(couponsInStore));
                break;
            case "Id":
                let couponsArray: CouponDetails[] = [];
                const idCoupon = couponsInStore.find(coupon => coupon.id == couponFilter.id)
                if (idCoupon) { couponsArray.push(idCoupon) };
                store.dispatch(couponsForViewAction(couponsArray));
                break;
            case "MaxPrice":
                store.dispatch(couponsForViewAction(couponsInStore.filter(coupon => coupon.price <= couponFilter.price)));
                break;
            case "Category":
                store.dispatch(couponsForViewAction(couponsInStore.filter(coupon => coupon.categoryID === couponFilter.categoryID)));
        }
    }

    return (

        <div className="companyCoupons">

            <Select style={{ width: 250 }} defaultValue="All" onChange={typeSet}  >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"MaxPrice"}>Max Price</MenuItem>
                <MenuItem value={"Category"}>Category </MenuItem>
                <MenuItem value={"Id"}>Id</MenuItem>
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

export default CompanyCoupons;
