import React from "react";
import './startPage.css'

const startPage = () =>{
    return(
        <div className = "container">
            <div className = "total-container">
                <div id = "title">
                    EyeTist
                </div>
                <div className = "box-container">
                    <div className = "box">
                        <div className = "box-in-title">Signup</div>
                        <div className = "box-in-content">Signup and<br/>Stay with us.</div>
                    </div>
                    <div className = "box">
                        <div className = "box-in-title">Login</div>
                        <div className = "box-in-content">Please login<br/>to use all the<br/>functions.</div>
                    </div>
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