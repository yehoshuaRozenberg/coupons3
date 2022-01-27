import "./companyDetails.css";
import { useEffect } from "react";
import store from "../../redux/store";
import { useHistory } from "react-router-dom";


function CompanyDetails(): JSX.Element {
    let history = useHistory();
    const Company1 = store.getState().CompaniesState.company;

    useEffect(() => {
        if (store.getState().authState.userDetails.clientType != "Companies") { history.push("/private/screen") }
    }, []);

    return (
        <div className="companyDetails">
            my details
            <div>
                id: {Company1.id} <br />
                name: {Company1.name} <br />
                email: {Company1.email} <br />
                password: {Company1.password} <br />
                <br /><br />

            </div>
        </div>
    );
}

export default CompanyDetails;
