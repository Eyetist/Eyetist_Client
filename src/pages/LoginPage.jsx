import React, {useRef, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import EyeMouse from "../components/mouse/EyeMouse";
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import EyeKeyboard from "../components/keyboard/EyeKeyboard";
import EyeButton from "../components/atoms/EyeButton";
import './Join.css'

const LoginPage = () =>{
    let [inputId, setInputId] = useState();
    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    return(
        <div className = "container">
            {
                focused ?
                <>
                    <EyeKeyboard 
                    />
                </>
                :
                <></>
            }
            <EyeMouse />
            <div style={{width:"300px", height:"200px", float:'right'}}>
                <FaceMeshCam
                    sensitivity = {2}
                />
            </div>
            <div className = "loginJoinContainer">
                <Link to = {`/`} className = "login-join-title">EyeTist</Link>
                <div className = "login-container">
                    <div id = "loginContainerText">Login</div>
                    
                    <div id = "idContainer">
                        <div className = "id-text">ID</div>
                        <input 
                            onFocus={onFocus}
                            onBlur={onBlur}
                            type="text" 
                            className="id"
                        />
                    </div>

                    <div id = "pwContainer">
                        <div className = "password-text">PW</div>
                        <input 
                            onFocus={onFocus}
                            onBlur={onBlur}
                            type="password" 
                            className="password" 
                        />
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