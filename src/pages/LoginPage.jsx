import React, {useRef, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import EyeMouse from "../components/mouse/EyeMouse";
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import EyeKeyboard from "../components/keyboard/EyeKeyboard";
import EyeButton from "../components/atoms/EyeButton";
import { sendLogin } from "../api/member/MemberAPI";
import './LoginJoin.css'

const LoginPage = () =>{
    {/**로그인 아이디 입력*/}
    const [inputId, setInputId] = useState('');
    const idRef = useRef(null);

    {/**로그인 비밀번호 입력*/}
    const [inputPw, setInputPw] = useState('');
    const passwordRef = useRef(null);

    const [idFocused, setIdFocused] = useState(false)
    const onIdFocus = () => setIdFocused(true)
    const onIdBlur = () => setIdFocused(false)
    const [pwFocused, setPwFocused] = useState(false)
    const onPwFocus = () => setPwFocused(true)
    const onPwBlur = () => setPwFocused(false)

    return(
        <div className = "main-container">
            <EyeMouse />
            <div className="login-join-top-container">
                <Link to = {`/`} className = "login-join-title">
                    EyeTist
                </Link>
                <div className="login-join-cam">
                    <FaceMeshCam
                        sensitivity = {2}
                    />
                </div>
            </div>
            <div className = "login-join-body-container">
                <div className = "login-container">
                    <div className="loginContainerText">Login</div>
                    
                    <div className="id-container">
                        <div className="id-text">ID</div>
                        <div>
                            <EyeButton 
                                style={{    
                                    height : "56px",
                                    width: "288px",
                                    backgroundColor: "black",
                                    border: "1px solid #B4A5A5",
                                    borderRadius: "24px",
                                    position: "absolute"
                                }}
                                text=""
                                hoverColor="gray"
                                clickColor="black"
                                onClick={() => {idRef.current.focus()}}
                            />
                            <input 
                                ref={idRef}
                                style={{
                                    height : '54px',
                                    width: '286px',
                                    background: "#FFFFFF",
                                    border: "1px solid #B4A5A5",
                                    borderRadius: "24px",
                                    position:"absolute",
                                    fontSize: "20px"
                                }}
                                value={ inputId }
                                onChange={e => setInputId(e.target.value)}
                                onFocus={onIdFocus}
                                onBlur={onIdBlur}
                                type="text" 
                                className="id" 
                            />
                        </div>
                    </div>

                    <div className="password-container">
                        <div className="password-text">PW</div>
                        <div>
                            <EyeButton 
                                style={{    
                                    height:"56px",
                                    width:"288px",
                                    backgroundColor:"black",
                                    border:"1px solid #B4A5A5",
                                    borderRadius:"24px",
                                    position:"absolute"
                                }}
                                text=""
                                hoverColor="gray"
                                clickColor="black"
                                onClick={() => {passwordRef.current.focus()}}
                            />
                            <input 
                                ref={passwordRef}
                                style={{
                                    height: '54px',
                                    width: '286px',
                                    background: "#FFFFFF",
                                    border: "1px solid #B4A5A5",
                                    borderRadius: "24px",
                                    position:"absolute",
                                    fontSize: "20px"
                                }}
                                onFocus={onPwFocus}
                                onBlur={onPwBlur}
                                value={ inputPw }
                                onChange={e => setInputPw(e.target.value)}
                                type="password" 
                                className="password" 
                            />
                        </div>
                    </div>
                    

                    <div className="loginButtonContainer">
                        <EyeButton 
                            style={{    
                                width : "100%",
                                color: "white",
                                backgroundColor: "#000000",
                                border: "1px solid #A4A4A4",
                                borderRadius: "30px",
                                textAlign: "center",
                                width: "90%",
                                height: "100%",
                                marginLeft: "4px",
                                fontSize: "25px"
                            }}
                            text="Login"
                            hoverColor="gray"
                            clickColor="black"
                            onClick={() => {sendLogin(inputId, inputPw)}}
                        />
                        <div id = "textContainer">
                            <div id = "joinDescription">Don't have an account?</div>
                            <div id = "joinText">Sign up for free.</div>
                        </div>
                    </div>                    
                </div>
                <div>
                {
                    idFocused ?
                    <EyeKeyboard 
                        inputState = {inputId}
                        setInputState = {setInputId}
                        setShow = {setIdFocused}
                        inputRef = {idRef}
                    />
                    :
                    <></>
                }
                {
                    pwFocused ?
                    <EyeKeyboard 
                        inputState = {inputPw}
                        setInputState = {setInputPw}
                        setShow = {setPwFocused}
                        inputRef = {passwordRef}
                    />
                    :
                    <></> 
                }
                </div>
            </div>
        </div>

    );
}
export default LoginPage;