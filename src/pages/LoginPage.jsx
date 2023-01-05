import React, {useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import './Join.css'

const LoginPage = () =>{


    return(
        <div className = "container">
            <div className = "loginJoinContainer">
                <Link to = {`/`} className = "login-join-title">EyeTist</Link>

                <div className = "login-container">

                    <div id = "loginContainerText">Login</div>
                    
                        <div id = "idContainer">
                            <div className = "id-text">ID</div>
                            <input type="text" className="id" />
                        </div>

                        <div id = "pwContainer">
                            <div className = "password-text">PW</div>
                            <input type="password" className="password" />
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
export default LoginPage;