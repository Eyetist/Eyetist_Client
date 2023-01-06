import React, {useCallback, useState} from 'react';
import {Link} from "react-router-dom";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import './Login.css';

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
    const idInput = (event) =>{
        setInputId(event.target.value);
    }
    {/**회원가입 비밀번호 입력*/}
    const [inputPw, setInputPw] = useState('');
    const pwInput = (event) =>{
        setInputPw(event.target.value);
    }

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
            sendJoin();
        }
    }
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const sendJoin = async() =>{
        const { data } = await axios({
            method: "POST",
            url: `http://localhost:8080/user/join`,
            mode: "cors",
            headers: {
              "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
            },
            data : {"email" : inputId, "password" : inputPw}
    });
        console.log(data);
    }

    return(
        <div className = "container">
            <div className = "loginJoinContainer">
                <Link to = {`/`} className = "login-join-title">EyeTist</Link>

                <div className = "login-container">

                    <div id = "loginContainerText">Join</div> 
                    
                        <div id = "idContainer">
                            <div className = "id-text">Id</div>
                            <input type="text" className="id" onChange={idInput}/>
                        </div>

                        <div id = "pwContainer">
                            <div className = "password-text">Pw</div>
                            <input type="text" className="join-password" onChange={pwInput}/>
                            <input type="checkbox" className = "checkbox" onClick={check}></input>
                        </div>

                        <div id = "loginButtonContainer">
                            <button id = "loginButton" onClick = {alerm}>Join</button>
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
                </div>
        </div>

    );
}
export default JoinPage;