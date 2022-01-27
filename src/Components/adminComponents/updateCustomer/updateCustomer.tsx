import { Typography, TextField, ButtonGroup, Button } from "@material-ui/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Customer from "../../model/Customer";
import store from "../../redux/store";
import "./updateCustomer.css";
import { updateCustomerAxios } from "../../axios/AdminAxiosService";

interface Id {
    id: number;
}


function UpdateCustomer(props: Id): JSX.Element {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Customer>();
    let history = useHistory();
    const CustomerNow = store.getState().AdminState.customers.find(customer => customer.id == props.id)
    setValue("id", CustomerNow.id);
    setValue("firstName", CustomerNow.firstName);
    setValue("lastName", CustomerNow.lastName);
    setValue("email", CustomerNow.email);
    setValue("password", CustomerNow.password);
    setValue("coupons", CustomerNow.coupons);

    useEffect(() => {
        if (store.getState().authState.userDetails.clientType != "Administrator") { history.push("/private/screen") }
    }, [])

    async function send(customer: Customer) {
        await updateCustomerAxios(customer);
    }

    return (
        <div className="updateCustomer">
            <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">Update Customer {CustomerNow.firstName} {CustomerNow.lastName}</Typography><br />
                <TextField label="firstName" variant="outlined"
                    {...register("firstName", {
                        required: { value: true, message: "field is required" }
                    })} />
                <span className="errors"> {errors.firstName && <p>{errors.firstName.message}</p>}</span>
                <br /><br />
                <TextField label="lastName" variant="outlined"
                    {...register("lastName", {
                        required: { value: true, message: "field is required" }
                    })} />
                <span className="errors"> {errors.lastName && <p>{errors.lastName.message}</p>}</span>
                <br /><br />
                <TextField label="email" variant="outlined"
                    {...register("email", {
                        required: { value: true, message: "field is required" }, pattern: {
                            value: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Invalid Email'
                        }
                    })} />
                <span className="errors"> {errors.email && <p>{errors.email.message}</p>}</span>
                <TextField label="password" variant="outlined" type="password"
                    {...register("password", { required: true, minLength: 3, maxLength: 10 })} />
                <span className="errors"> {errors.password && <p>{errors.password.message}</p>}</span>

                <br /><br />
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary">Send</Button>
                </ButtonGroup>

            </form>
        </div>
    );
}

export default UpdateCustomer;


