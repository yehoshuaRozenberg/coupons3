import { BrowserRouter } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import MainRouting from "../mainRouting/mainRouting";
import "./layout.css";

function Layout(): JSX.Element {
    return (
        <div className="layout">
            <BrowserRouter> 
            <header><Header/></header>
            <main><MainRouting/></main>
            <footer><Footer/></footer>
            </BrowserRouter>
        </div>
    );
}

export default Layout;
