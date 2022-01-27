import { Typography, TextField, ButtonGroup, Button } from "@material-ui/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Company from "../../model/Company";
import store from "../../redux/store";
import "./updateCompany.css";
import { updateCompanyAxios } from "../../axios/AdminAxiosService";


interface Id {
    id: number;
}

function UpdateCompany(props: Id): JSX.Element {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Company>();
    let history = useHistory();


    const CompanyNow = store.getState().AdminState.companies.find(company => company.id == props.id)
    setValue("id", CompanyNow.id);
    setValue("name", CompanyNow.name);
    setValue("email", CompanyNow.email);
    setValue("password", CompanyNow.password);
    setValue("coupons", CompanyNow.coupons);

    useEffect(() => {
        if (store.getState().authState.userDetails.clientType != "Administrator") { history.push("/private/screen") }
    }, [])

    async function send(company: Company) {
        console.log(company);
        await updateCompanyAxios(company);
    }


    return (
        <div className="updateCompany">
            <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">Update Company {CompanyNow.name}</Typography><br />
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

export default UpdateCompany;

