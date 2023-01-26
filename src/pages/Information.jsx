import React, {useState} from "react";
import EyeMouse from "../components/mouse/EyeMouse";
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import EyeCard from "../components/atoms/EyeCard";
import { useNavigate } from "react-router-dom";
import ModeSelection from "../components/functionDetails/ModeSelection";
import './Information.css'


const Information = () =>{
    let navigate = useNavigate();

    const videos = {
        introVideo: require('../video/EyeTist_Intro.mp4')
    }

    let informationContent = [
        "Our service is to draw pictures with our face.",
        "If you move your head, the mouse moves.",
        "You can click the button by blinking your right eye. Also you can draw by blinking your left eye and opening mouth.",
        "If you want to see a short introduction video, please click on it."
    ]
    let startContent = [
        "Click this button to start EyeTist!",
        "An amazing world awaits you."
    ]

    let [videoPlay, setVideoPlay] = useState(false)

    return(
        <div className = "information-main-container">
            <ModeSelection />
            <ul className="lines">
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
            </ul>
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
                    {
                        videoPlay ?
                            <video width="70%" height="100%" autoPlay="autoplay">
                                <source src={videos.introVideo} type="video/mp4"/>
                            </video>
                        :
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
                                onClick={() => {
                                    setVideoPlay(true)}}
                            />
                    }
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
                        onClick={() => {navigate('/setting')}}
                    />
                </div>
            </div>
        </div>
    );
}
export default Information;