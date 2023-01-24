import React, {useRef, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import EyeMouse from "../components/mouse/EyeMouse";
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import EyeKeyboard from "../components/keyboard/EyeKeyboard";
import EyeButton from "../components/atoms/EyeButton";
import { useNavigate } from "react-router-dom";
import { sendLogin } from "../api/member/MemberAPI";
import './LoginJoin.css'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const LoginPage = () =>{
    let navigate = useNavigate();
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

    const [openLoginFail, setOpenLoginFail] = useState(false)

    function login(){
        sendLogin(inputId, inputPw)
        .then( (res) => {
            if (res.data === 200){
                localStorage.clear()
                localStorage.setItem('loginMemberId', inputId)
                navigate('/begin')
            }
            else{
                setOpenLoginFail(true);
                setTimeout(function(){
                    setOpenLoginFail(false);
                }, 2000)
            }
        }, )
    }

    useEffect( () => {
        // localStorage.setItem('loginMemberId', "test")
        if (localStorage.getItem('loginMemberId') && navigate){
            navigate('/begin')
        }
    }, [])

    return(
        <div className = "main-container">
            <EyeMouse />
            <div className="login-join-top-container">ㄱ
                <Link to = {`/`} className = "login-join-title">
                    EyeTist
                </Link>
                <div className="login-join-cam">
                    <FaceMeshCam />
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
                                width : "90%",
                                color: "white",
                                backgroundColor: "#000000",
                                border: "1px solid #A4A4A4",
                                borderRadius: "30px",
                                textAlign: "center",
                                height: "100%",
                                marginLeft: "4px",
                                fontSize: "25px"
                            }}
                            text="Login"
                            hoverColor="gray"
                            clickColor="black"
                            onClick={() => login()}
                        />
                        <BootstrapDialog
                            aria-labelledby="customized-dialog-title"
                            open={openLoginFail}
                            onClose={() =>{setOpenLoginFail(false)}}
                        >The ID or password you entered is incorrect.<br/>Please enter valid Id and password</BootstrapDialog>
                        <div id = "textContainer">
                            <div id = "joinDescription">Don't have an account?</div>

                            <EyeButton 
                                style={{    
                                    width : "52%",
                                    color: "black",
                                    backgroundColor: "inherit",
                                    fontSize: "30px",
                                }}
                                text="Sign up for free."
                                hoverFontColor="white"
                                hoverColor="inherit"
                                clickColor="inherit"
                                onClick={() => {navigate('/join')}}
                            />
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