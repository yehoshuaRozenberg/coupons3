import { useState } from "react";
import "./about.css";

function About(): JSX.Element {
    const [myButton, setValue] = useState("Contact Us")
    const [hide, setHide] = useState(false)

    function readMore() {
        if (hide) {
            setValue("Contact Us")
        }
        else { setValue("close") }
        setHide(!hide)
    }

    function more() {
        let text;
        if (hide) {
            text = <div>
                <div><h2>Shalom Gottlieb and yehoshua Rosenberg,</h2></div>
                <div><h4>full stuck Software Developers, graduates of John Bryce's Java full stack course with honors.</h4></div>
                <div><h4>we are controlled in Java, Spring, Type script and React.</h4></div>
                <div><h4>Try us, and you won't be disappointed!</h4></div>

                <div><h2> Shalom Gottlieb </h2></div>
                <div><h2> Phone: 058-6126333</h2></div>
                <div><h2> email: shalomgottlieb@gmail.com‏ </h2></div>

                <div><h2> yehoshua Rosenberg</h2></div>
                <div><h2> Phone: 054-2106049</h2></div>
                <div><h2>  Email: yerozenberg@gmail.com</h2></div>            </div>
            return text;
        }
    }

    return (
        <div className="about ">
            <div> <h1> About BETTER AND CHEEPER  </h1></div>
            <div> <h2> We are here to unite people into a huge purchasing power </h2>  </div>
            <div> On BETTER AND CHEEPER website, countless deals are published at more affordable prices than ever, thanks to the group's purchasing power  </div>
            <div>  Why pay dearly, when you can get the same thing at a group price, significantly cheaper?  </div>
            <div> <h2> BETTER AND CHEEPER: because of the reliability, service, and price </h2>  </div>
            <div> Reliability: We have no hidden clauses or small print that are hidden. You can be sure that you will get what you want, without surprises </div>
            <div> Service: The businesses we work with have been carefully selected, with an emphasis on a developed service consciousness </div>
            <div>  And the price? No need to expand. Just take a look at our deals, and you will understand for yourself  </div>
            {more()}
            <input type="button" value={myButton} onClick={readMore} />

        </div>
    );
}

export default About;
