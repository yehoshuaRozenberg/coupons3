import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./updateCoupon.css";
import { useForm } from "react-hook-form";
import Coupon from "../../model/CouponDetails";
import store from "../../redux/store";
import { Button, ButtonGroup, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import CouponDetails from "../../model/CouponDetails";
import { updateCouponAxios } from "../../axios/CompanyAxiosService";
import { fileHandler } from "../../axios/GeneralAxiosService";

interface Id {
    id: string;
}

function UpdateCoupon(props: Id): JSX.Element {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<CouponDetails>();
    const [imgEvent, setImgEvent] = useState<any>();
    let history = useHistory();
    const propId = parseInt(props.id.replace(":", ""));

    useEffect(() => {
        if (store.getState().authState.userDetails.clientType != "Companies") { history.push("/private/screen") }
    }, []);


    const CouponNow = store.getState().CompaniesState.company.coupons.find(coupon => coupon.id == propId)
    console.log(CouponNow);
    setValue("id", CouponNow.id);
    setValue("companyID", CouponNow.companyID);
    setValue("categoryID", CouponNow.categoryID);
    setValue("title", CouponNow.title);
    setValue("discount", CouponNow.discount);
    setValue("description", CouponNow.description);
    setValue("amount", CouponNow.amount);
    setValue("price", CouponNow.price);
    setValue("image", CouponNow.image);

    async function send(coupon: Coupon) {
        if (imgEvent!=undefined) {
            let url = await fileHandler(imgEvent)
            console.log(url)
            if(url!="error"){coupon.image = url};
            console.log(CouponNow);
        }
        await updateCouponAxios(coupon);
    }

   

    function imageHandler(event:any) {
                setImgEvent(event);
    }
  

    return (
        <div className="updateCoupon noBorderBox">
            <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">update Coupon{CouponNow.title}</Typography><br />
                <TextField label="title" variant="outlined"
                    {...register("title", {
                        required: { value: true, message: "field is required" }
                    })} />
                <span className="errors"> {errors.title && <p>{errors.title.message}</p>}</span>
                <br /><br />

                <br />
                Category<br />
                <Select style={{ width: 250 }} defaultValue={CouponNow.categoryID} {...register("categoryID", {
                    required: { value: true, message: "this field is required" }
                })}>
                    { }
                    <MenuItem value={"FOOD"}>FOOD</MenuItem>
                    <MenuItem value={"ELECTRICITY"}>ELECTRICITY</MenuItem>
                    <MenuItem value={"RESTAURANT"}>RESTAURANT </MenuItem>
                    <MenuItem value={"VACATION"}>VACATION</MenuItem>
                    <MenuItem value={"HOME"}>HOME</MenuItem>
                    <MenuItem value={"CLOTHING"}>CLOTHING</MenuItem>
                </Select>
                <br />
                <span className="errors"> {errors.categoryID && <p>{errors.categoryID.message}</p>}</span>
                <br />
                <TextField label="discount" variant="outlined"
                    {...register("discount", {
                        required: { value: true, message: "field is required" },
                        maxLength: {value: 4, message:"maximum length is 4 simbols"}
                    })} />
                <span className="errors"> {errors.discount && <p>{errors.discount.message}</p>}</span>
                <br /><br />
                <TextField label="description" variant="outlined"
                    {...register("description", {
                        required: { value: true, message: "field is required" }
                    })} />
                <span className="errors"> {errors.description && <p>{errors.description.message}</p>}</span>
                <br /><br />

                <TextField
                    {...register("startDate")}
                    id="datetime-local"
                    label="Start Date"
                    type="datetime-local"
                    defaultValue={CouponNow.startDate.toString().split(":")[0] + ":" + (CouponNow.startDate.toString().split(":")[1])}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br /><br />
                <TextField
                    {...register("endDate")}
                    id="datetime-local"
                    label="End Date"
                    type="datetime-local"
                    defaultValue={CouponNow.endDate.toString().split(":")[0] + ":" + (CouponNow.endDate.toString().split(":")[1])}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br /><br />


                <TextField type="number" label="amount" variant="outlined" {...register("amount", {
                    required: { value: true, message: "this field is required" },
                    min: { value: 1, message: "minimum amount is 1 Piece" },

                })} />
                <br />
                <span className="errors"> {errors.amount && <p>{errors.amount.message}</p>}</span>
                <br />
                <TextField type="number" label="price" variant="outlined" {...register("price", {
                    required: { value: true, message: "this field is required" },
                    min: { value: 0, message: "minimum price is 0 NIS" },
                })} />
                <br />
                <span className="errors"> {errors.price && <p>{errors.price.message}</p>}</span>
                <br />
                <label>Image</label> <br />
                <img className="img" src={CouponNow.image} ></img>
                <input type="file" name="myImg" accept="image/*" onChange={imageHandler} />

                <br /><br />

                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary">Send</Button>
                </ButtonGroup>

                <input type="button" value="back" onClick={() => history.go(-1)} />


            </form>
        
        </div>
    );
}

export default UpdateCoupon;
