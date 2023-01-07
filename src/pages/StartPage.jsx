import React from "react";
import {Link} from "react-router-dom";
import EyeMouse from "../components/mouse/EyeMouse";
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import EyeCard from "../components/atoms/EyeCard";
import { useNavigate } from "react-router-dom";
import './StartPage.css'

const StartPage = () =>{
    let navigate = useNavigate();
    return(
        <div className = "main-container">
            <EyeMouse />
            <div className="start-page-top-container">
                <Link to = {`/`} className = "login-join-title">
                    EyeTist
                </Link>
                <div className="login-join-cam">
                    <FaceMeshCam />
                </div>
            </div>
            <div className = "start-page-body-container">
                <div className = "box-container">
                    <EyeCard 
                        style={{
                            width: "30%",
                            height: "100%",
                            backgroundColor: "#FFC7C7",
                            borderRadius: "20px",
                            marginLeft: "30px",
                            marginRight: "30px"
                        }}
                        title="SignUp"
                        content="Signup and Stay with us."
                        hoverColor="#f79393"
                        clickColor="#f46969"
                        onClick={() => {navigate('/join')}}
                    />
                    <EyeCard 
                        style={{
                            width: "30%",
                            height: "100%",
                            backgroundColor: "#FFC7C7",
                            borderRadius: "20px",
                            marginLeft: "30px",
                            marginRight: "30px"
                        }}
                        title="Login"
                        content="Please login to use all the functions."
                        hoverColor="#f79393"
                        clickColor="#f46969"
                        onClick={() => {navigate('/login')}}
                    />
                    <EyeCard 
                        style={{
                            width: "30%",
                            height: "100%",
                            backgroundColor: "#FFC7C7",
                            borderRadius: "20px",
                            marginLeft: "30px",
                            marginRight: "30px"
                        }}
                        title="Toturial"
                        content="Before we get started, We provide tutorial"
                        hoverColor="#f79393"
                        clickColor="#f46969"
                        onClick={() => {navigate('/paint')}}
                    />
                </div>
            </div>
        </div>

    );
}
export default StartPage;