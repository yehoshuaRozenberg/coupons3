import { Typography, TextField, ButtonGroup, Button } from "@material-ui/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import "./addCompany.css";
import Company from "../../model/Company";
import { addCompanyAxios } from "../../axios/AdminAxiosService";
import store from "../../redux/store";

function AddCompany(): JSX.Element {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<Company>();
    const history = useHistory();

    useEffect(() => {
        if (store.getState().authState.userDetails.clientType != "Administrator") { history.push("/private/screen") }
    }, []);

    async function send(company: Company) {
        await addCompanyAxios(company)
    }


    return (
        <div className="addCompany">

            <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">Add New Company</Typography><br />
                <TextField label="name" variant="outlined"
                    {...register("name", {
                        required: { value: true, message: "field is required" }
                    })} />
                <span className="errors"> {errors.name && <p>{errors.name.message}</p>}</span>
                <br /><br />
                <TextField label="email" variant="outlined"
                    {...register("email", {
                        required: { value: true, message: "field is required" },
                        pattern: {
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

export default AddCompany;

