import { Typography, TextField, ButtonGroup, Button } from "@material-ui/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Customer from "../../model/Customer";
import "./addCustomer.css";
import { addCustomerAxios } from "../../axios/AdminAxiosService";
import store from "../../redux/store";

function AddCustomer(): JSX.Element {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<Customer>();
    const history = useHistory();

    useEffect(() => {
        if (store.getState().authState.userDetails.clientType != "Administrator") { history.push("/private/screen") }
    }, [])

    async function send(customer: Customer) {
        await addCustomerAxios(customer);
    }

    return (
        <div className="addCustomer">
            <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">Add New Customer</Typography><br />
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
                <br /><br />
                <LockOpenIcon style={{ fontSize: 40, margin: 10 }} />
                <TextField label="password" variant="outlined" type="password"
                    {...register("password", { required: true, minLength: 3, maxLength: 10 })} />
                <span className="errors"> {errors.password && <p>{errors.password.message}</p>}</span>

                <br /><br />
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary">Send</Button>
                </ButtonGroup>

            </form>
            <br />
            <Button type="submit" color="primary" variant="outlined" onClick={() =>history.go(-1)} >Back</Button>

        </div>
    );
}

export default AddCustomer;

