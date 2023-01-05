import React, {useCallback, useState} from 'react';
import {Link} from "react-router-dom";
import './Login.css'

const JoinPage = () =>{

    // const [checked, setChecked] = useState(false);
    
    const [checked, setChecked] = useState(false);


    const onChange = useCallback(() => {
        setChecked(prev => !prev);
    }, []);


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
                            <input type="checkbox" className = "checkbox"></input>
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
export default JoinPage;