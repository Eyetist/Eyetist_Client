import React from "react";
import {Link} from "react-router-dom";
import './startPage.css'

const startPage = () =>{
    return(
        <div className = "container">
            <div className = "total-container">
                <Link to = {`/`} id = "title">
                    EyeTist
                </Link>
                <div className = "box-container">
                    <Link to = {`/join`}  className = "box">
                        <div to = {`/join`} className = "box-in-title">Signup</div>
                        <div className = "box-in-content">Signup and<br/>Stay with us.</div>
                    </Link>
                    <Link to = {`/login`} className = "box">
                        <div to = {`/login`} className = "box-in-title">Login</div>
                        <div className = "box-in-content">Please login<br/>to use all the<br/>functions.</div>
                    </Link>
                    <div className = "box">
                        <div className = "box-in-title">Toturial</div>
                        <div className = "box-in-content">Before we get <br/>started,<br/>We provide a <br/>tutorial</div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default startPage;