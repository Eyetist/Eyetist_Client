import React from "react";
import EyeMouse from "../components/mouse/EyeMouse";
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import EyeCard from "../components/atoms/EyeCard";
import { useNavigate } from "react-router-dom";
import './Information.css'

const Information = () =>{
    let navigate = useNavigate();
    let informationContent = [
        "Our service is to draw pictures with our eyes.",
        "If you move your head, the mouse moves.",
        "You can click the button by blinking your right eye.",
        "Also you can draw by closing your left eye."
    ]

    let startContent = [
        "Click this button to start EyeTist!",
        "An amazing world awaits you."
    ]

    return(
        <div className = "main-container">
            {/* <ul className="lines">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul> */}
            <EyeMouse />
            <div className="information-top-container">
                <div className = "information-title">
                    EyeTist
                </div>
                <div className="information-cam">
                    <FaceMeshCam />
                </div>
            </div>

            <div className = "start-page-body-container">
                <div className = "box-container">
                    <EyeCard 
                        style={{
                            width: "70%",
                            height: "100%",
                            backgroundColor: "#f79393",
                            borderRadius: "20px",
                            marginLeft: "30px",
                            marginRight: "30px"
                        }}
                        title="< What is EyeTist >"
                        content={informationContent}
                        hoverColor="#f46969"
                        clickColor="#f45555"
                        onClick={() => {}}
                    />
                    <EyeCard 
                        style={{
                            width: "30%",
                            height: "100%",
                            backgroundColor: "#f79393",
                            borderRadius: "20px",
                            marginLeft: "30px",
                            marginRight: "30px"
                        }}
                        title="Start"
                        content={startContent}
                        hoverColor="#f46969"
                        clickColor="#f45555"
                        onClick={() => {navigate('/login')}}
                    />
                </div>
            </div>
        </div>

    );
}
export default Information;