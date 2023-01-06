import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { sendJoin } from '../api/member/MemberAPI';
import EyeMouse from '../components/mouse/EyeMouse';
import FaceMeshCam from '../components/faceMesh/FaseMeshCam';
import EyeButton from '../components/atoms/EyeButton';
import EyeKeyboard from '../components/keyboard/EyeKeyboard';
import './LoginJoin.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const JoinPage = () =>{

    const [checked, setChecked] = useState(false);

    {/**회원가입 아이디 입력*/}
    const [inputId, setInputId] = useState('');
    const idRef = useRef(null);

    {/**회원가입 비밀번호 입력*/}
    const [inputPw, setInputPw] = useState('');
    const passwordRef = useRef(null);

    const [idFocused, setIdFocused] = useState(false)
    const onIdFocus = () => setIdFocused(true)
    const onIdBlur = () => setIdFocused(false)
    const [pwFocused, setPwFocused] = useState(false)
    const onPwFocus = () => setPwFocused(true)
    const onPwBlur = () => setPwFocused(false)

    // 비밀번호 확인 체크
    const check = () =>{
        if(checked === false){
            setChecked(true);
        }
        else{
            setChecked(false);
        }
    }
    // 비밀번호 체크 안했으면 모달창 뜸
    const alerm = () =>{
        if(checked === false) {
            setOpen(true);
            setTimeout(function(){
                handleClose();
            }, 1000)
        }
        else{
            sendJoin(inputId, inputPw);
        }
    }
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };


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

                    <div className="loginContainerText">Join</div> 
                
                        <div className = "id-container">
                            <div className = "id-text">Id</div>
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

                        <div className = "password-container">
                            <div className = "password-text">Pw</div>
                            <div style={{height:"56px", width:"240px"}}>
                                <EyeButton 
                                    style={{    
                                        height:"56px",
                                        width:"238px",
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
                                        width: '236px',
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
                                    type="text" 
                                    className="join-password" 
                                />
                            </div>
                            <div>
                                <EyeButton 
                                    style={{    
                                        height:"50px",
                                        width:"50px",
                                        backgroundColor:"inherit",
                                        position:"absolute"
                                    }}
                                    text=""
                                    hoverColor="inherit"
                                    clickColor="inherit"
                                    onClick={() => {setChecked(!checked)}}
                                />
                                <input 
                                    checked={checked}
                                    type="checkbox" 
                                    className="checkbox" 
                                    onChange={check}
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
                                text="Join"
                                hoverColor="gray"
                                clickColor="black"
                                onClick={() => alerm()}
                            />
                            <BootstrapDialog
                                aria-labelledby="customized-dialog-title"
                                open={open}
                                onClose={handleClose}
                            >Please check the <br/>password checkbox.</BootstrapDialog>
                            <div id = "textContainer">
                                <div id = "joinDescription">have you an account?</div>
                                <div id = "joinText">Go Login.</div>
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
export default JoinPage;