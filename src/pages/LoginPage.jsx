import React, {useRef, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import './Join.css'

const LoginPage = () =>{

    {/**로그인 아이디 입력*/}
    const [inputId, setInputId] = useState('');
    const idInput = (event) =>{
        setInputId(event.target.value);
    }
    {/**로그인 비밀번호 입력*/}
    const [inputPw, setInputPw] = useState('');
    const pwInput = (event) =>{
        setInputPw(event.target.value);
    }

    const sendLogin = async() =>{
        const { data } = await axios({
            method: "POST",
            url: `http://localhost:8080/user/login`,
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

                    <div id = "loginContainerText">Login</div>
                    
                        <div id = "idContainer">
                            <div className = "id-text">ID</div>
                            <input type="text" className="id" onChange={idInput}/>
                        </div>

                        <div id = "pwContainer">
                            <div className = "password-text">PW</div>
                            <input type="password" className="password" onChange={pwInput}/>
                        </div>
                        

                        <div id = "loginButtonContainer">
                            <button id = "loginButton" onClick={sendLogin}>Login</button>
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