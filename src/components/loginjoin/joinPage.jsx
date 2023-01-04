import React from "react";
import './login.css'

const joinPage = () =>{
    return(
        <div className = "container">
            <div className = "loginJoinContainer">
                <div className = "login-join-title">EyeTist</div>

                <div className = "login-container">

                    <div id = "loginContainerText">Join</div>
                    
                        <div id = "idContainer">
                            <div className = "id-text">Id</div>
                            <input type="text" className="id" />
                        </div>

                        <div id = "pwContainer">
                            <div className = "password-text">Pw</div>
                            <input type="text" className="join-password"/>
                            <button className = "check-button"></button>
                        </div>

                        <div id = "loginButtonContainer">
                            <button id = "loginButton">Login</button>
                            <div id = "textContainer">
                                <div id = "joinDescription">Don't have an account?</div>
                                <div id = "joinText">Sign up for free.</div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

    );
}
export default joinPage;