import "./LoginFC.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import LoginDetails from "../../model/LoginDetails";
import store from "../../redux/store";
import { Typography, TextField, Select, MenuItem, ButtonGroup, Button } from "@material-ui/core";
import { loginAxios } from "../../axios/GeneralAxiosService";
import { useState } from "react";
import Customer from "../../model/Customer";
import Company from "../../model/Company";
import { registerCompanyAxios, registerCustomerAxios } from "../../axios/GuestAxiosService";

function LoginFC(): JSX.Element {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginDetails>();
    const { register: registerCust, handleSubmit: handleSubmitCust, setError: setErrorCust, formState: { errors: errorsCust }, setValue: setValueCust } = useForm<Customer>();
    const { register: registerComp, handleSubmit: handleSubmitComp, setError: setErrorComp, formState: { errors: errorsComp }, setValue: setValueComp } = useForm<Company>();
    const history = useHistory();
    const [isSign, setSign] = useState(false);
    const [isRegister, setRegister] = useState(true);
    const [isCustomer, setCustomer] = useState(true);
    const [isCompany, setCompany] = useState(false);

    async function send(loginDetails: LoginDetails) {
        console.log(loginDetails.clientType);
        await loginAxios(loginDetails);
        if ((store.getState().authState.userDetails.clientType != "")&&(!history.location.pathname.includes("/coupon/payment"))) { history.push("/private/screen") }
    }

    async function sendComp(company: Company) {
        console.log(company);
        await registerCompanyAxios(company);
        if (store.getState().authState.userDetails.clientType != "") { history.push("/private/screen") }
    }

    async function sendCust(customer: Customer) {
        console.log(customer);
        await registerCustomerAxios(customer);
        if (store.getState().authState.userDetails.clientType != "") { history.push("/private/screen") }
    }

    const signing =
        <div>
            <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">Sign In</Typography>
                <Button type="submit" color="primary" onClick={() =>{setSign(false); setRegister(true);}}  /*fullWidth*/>never registered?  Register</Button><br /><br />
                <TextField label="email" variant="outlined"
                    {...register("email", {
                        required: { value: true, message: "field is required" }, pattern: {
                            value: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Invalid Email'
                        }
                    })} />
                <span className="errors" > {errors.email && <p>{errors.email.message}</p>}</span>
                <br /><br />
                <TextField label="password" variant="outlined" type="password"
                    {...register("password", { required: true, minLength: 3, maxLength: 10 })} />
                <br /><br />
                <div>select user type</div><br />
                <Select style={{ width: 250 }} defaultValue="Customers"/*"select user type"*/ {...register("clientType", { required: true })}>
                    <MenuItem id="1" value="Administrator">System Administrator</MenuItem>
                    <MenuItem id="2" value="Companies">Company</MenuItem>
                    <MenuItem id="3" value="Customers">Client</MenuItem>
                </Select>
                <br /><br />

                <ButtonGroup variant="contained" >
                    <Button type="submit" color="primary" > LOGIN </Button>
                </ButtonGroup>
            </form>
        </div>

    const customerForm = <div>
        customer register
                    <form onSubmit={handleSubmitCust(sendCust)}>
                <TextField label="firstName" variant="outlined"
                    {...registerCust("firstName", {
                        required: { value: true, message: "field is required" }
                    })} />
                <span className="errors"> {errorsCust.firstName && <p>{errorsCust.firstName.message}</p>}</span>
                <br /><br />
                <TextField label="lastName" variant="outlined"
                    {...registerCust("lastName", {
                        required: { value: true, message: "field is required" }
                    })} />
                <span className="errors"> {errorsCust.lastName && <p>{errorsCust.lastName.message}</p>}</span>
                <br /><br />
                <TextField label="email" variant="outlined"
                    {...registerCust("email", {
                        required: { value: true, message: "field is required" }, pattern: {
                            value: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Invalid Email'
                        }
                    })} />
                <span className="errors"> {errorsCust.email && <p>{errorsCust.email.message}</p>}</span>
                {/* <LockOpenIcon style={{ fontSize: 40, margin: 10 }} /> */}
                <br /><br />
                <TextField label="password" variant="outlined" type="password"
                    {...registerCust("password", { required: true, minLength: 3, maxLength: 10 })} />
                <span className="errors"> {errorsCust.password && <p>{errorsCust.password.message}</p>}</span>
                <br /><br />
                <ButtonGroup variant="contained" >
                    <Button type="submit" color="primary">Send</Button>
                </ButtonGroup>

            </form>
    </div>

    const companyForm = <div>
                company register
                    <form onSubmit={handleSubmitComp(sendComp)}>
                <TextField label="name" variant="outlined"
                    {...registerComp("name", {
                        required: { value: true, message: "field is required" }
                    })} />
                <span className="errors"> {errorsComp.name && <p>{errorsComp.name.message}</p>}</span>
                <br /><br />
                <TextField label="email" variant="outlined"
                    {...registerComp("email", {
                        required: { value: true, message: "field is required" },
                        pattern: {
                            value: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Invalid Email'
                        }
                    })} />
                <span className="errors"> {errorsComp.email && <p>{errorsComp.email.message}</p>}</span>
                <br /><br />
                
                <TextField label="password" variant="outlined" type="password"
                    {...registerComp("password", { required: true, minLength: 3, maxLength: 10 })} />
                <span className="errors"> {errorsComp.password && <p>{errorsComp.password.message}</p>}</span>

                <br /><br />
                <ButtonGroup variant="contained" >
                    <Button type="submit" color="primary">Send</Button>
                </ButtonGroup>

            </form>

    </div>



    const registering = <div>
        <Typography variant="h4" className="HeadLine">Register</Typography>
        <Button type="submit" color="primary" onClick={() =>{setSign(true); setRegister(false);}}  /*fullWidth*/>already registered?  Sign In</Button>
                    <br /><br />
        <Button type="submit" color="primary" onClick={()=>{setCustomer(true); setCompany(false)}}  /*fullWidth*/>As Customer</Button>
        <Button type="submit" color="primary" onClick={()=>{setCustomer(false); setCompany(true)}}  /*fullWidth*/>As Company</Button>
        <br /><br />
        {isCustomer && customerForm}
        {isCompany && companyForm}
    </div>





    return (
        <div className="LoginFC">
            {isSign && signing}
            {isRegister && registering}
        </div>
    );

}
export default LoginFC;

