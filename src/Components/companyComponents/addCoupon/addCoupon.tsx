import { Button, ButtonGroup, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CouponDetails from "../../model/CouponDetails";
import store from "../../redux/store";
import { addCouponAxios } from "../../axios/CompanyAxiosService";
import "./addCoupon.css";
import { fileHandler } from "../../axios/GeneralAxiosService";


function AddCoupon(): JSX.Element {
    const { register, handleSubmit, setError, formState: { errors }, setValue } = useForm<CouponDetails>();
    const [imgEvent, setImgEvent] = useState();
    let history = useHistory();

    useEffect(() => {
        if (store.getState().authState.userDetails.clientType != "Companies") { history.push("/private/screen") }
    }, []);

    async function send(coupon: CouponDetails) {
        if (imgEvent!=undefined) {
            let url = await fileHandler(imgEvent)
            console.log(url)
            if(url!="error"){coupon.image = url};
        }
        await addCouponAxios(coupon);
    }

   

    function imageHandler(event:any) {
                setImgEvent(event);
    }

    // async function send(coupon: CouponDetails) {
    //     let url = await fileHandler(imgEvent)
    //     setValue("image", url);
    //     await addCouponAxios(coupon);
    // };

    // async function imageHandler(myEvent: any) {
    //     setImgEvent(myEvent);
    // }

    return (
        <div className="addCoupon">
            <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">Add New Coupon</Typography><br />
                <TextField label="title" variant="outlined"
                    {...register("title", {
                        required: { value: true, message: "field is required" }
                    })} />
                <span className="errors"> {errors.title && <p>{errors.title.message}</p>}</span>
                <br /><br />
                Category<br />
                <Select style={{ width: 250 }} {...register("categoryID", {
                    required: { value: true, message: "this field is required" }
                })}>
                    <MenuItem value={"0"}>FOOD</MenuItem>
                    <MenuItem value={"1"}>ELECTRICITY</MenuItem>
                    <MenuItem value={"2"}>RESTAURANT </MenuItem>
                    <MenuItem value={"3"}>VACATION</MenuItem>
                    <MenuItem value={"4"}>HOME</MenuItem>
                    <MenuItem value={"5"}>CLOTHING</MenuItem>
                </Select>
                <br />
                <span className="errors"> {errors.categoryID && <p>{errors.categoryID.message}</p>}</span>
                <br />
                <TextField label="discount" variant="outlined"
                    {...register("discount", {
                        required: { value: true, message: "field is required" },
                        maxLength: { value: 4, message: "maximum size is 4 simbols" },
                    })} />
                <span className="errors"> {errors.discount && <p>{errors.discount.message}</p>}</span>
                <br />
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
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br /><br />
                <TextField
                    {...register("endDate")}
                    id="date-local"
                    label="End Date"
                    type="datetime-local"
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
                    min: { value: 1, message: "minimum price is 1 NIS" },
                })} />
                <br />
                <span className="errors"> {errors.price && <p>{errors.price.message}</p>}</span>
                <br />
                <input type="file" name="myImg" accept="image/*" onChange={imageHandler} />
                <span className="errors"> {errors.image && <p>{errors.image.message}</p>}</span>
                <br /><br />
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary">Send</Button>
                </ButtonGroup>

            </form>
        </div>
    );
}

export default AddCoupon;
