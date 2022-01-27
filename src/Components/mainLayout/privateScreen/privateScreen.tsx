import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import LoginFC from "../../mainComponent/LoginFC/LoginFC";
import store from "../../redux/store";
import PrivateAside from "../privateAside/privateAside";
import PrivateRouting from "../privateRouting/privateRouting";

import "./privateScreen.css";



function PrivateScreen(): JSX.Element {

    if (store.getState().authState.userDetails.clientType === "") {
        return (
            <div>
                <h5>need to login</h5>
                <LoginFC />
            </div>
        )
    }
    else return (
        <div className="privateScreen">

            <BrowserRouter>
                <aside><PrivateAside /></aside>
                <main className="center"><PrivateRouting /></main>
            </BrowserRouter>

        </div>
    );
}

export default PrivateScreen;
