import React, { useState, useRef } from 'react';
import { Checkbox, Radio, Switch } from 'pretty-checkbox-react';
import {Link} from "react-router-dom";
import '@djthoms/pretty-checkbox';
import './login.css'

const joinPage = () =>{
    return(
        <div className = "container">
            <div className = "loginJoinContainer">
                <Link to = {`/`} className = "login-join-title">EyeTist</Link>

                <div className = "login-container">

                    <div id = "loginContainerText">Join</div> 
                    
                        <div id = "idContainer">
                            <div className = "id-text">Id</div>
                            <input type="text" className="id" />
                        </div>

                        <div id = "pwContainer">
                            <div className = "password-text">Pw</div>
                            <input type="text" className="join-password"/>
                            <Checkbox shape="round" animation="pulse"></Checkbox>
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