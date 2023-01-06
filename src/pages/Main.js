import React, { useEffect, useState } from "react";
import "./Main.css"
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import { Canvas } from '../components/canvas/Canvas'
import { useCanvas } from "../components/canvas/CanvasContext";
import EyeButton from "../components/atoms/EyeButton";
import CustomSlider from "../components/atoms/CustomSlider";
import EyeMouse from "../components/mouse/EyeMouse";
import EyeKeyboard from "../components/keyboard/EyeKeyboard";

const Main = () => {
    let [sensitivity, SetSensitivity] = useState(3);
    const { clearCanvas } = useCanvas()
    return (
        <div className="whole-container">
            <EyeMouse />
            {/* <EyeKeyboard /> */}
            <div className="top-bar"> {/*상단 바 div*/}
                <div className="eyetist-font">
                    EyeTist
                </div>
                
                <div style={{marginTop: "30px"}}>
                    <CustomSlider 
                        title = "Sensitivity"
                        progress = {sensitivity}
                        setProgress = {SetSensitivity}
                        maxRange = {10}
                        width = "200px"
                        height = "10px"
                    />
                </div>
                {/* <EyeKeyboard /> */}
            </div>

            <div className="components-container">
                
                <div className="functions-container">
                    <EyeButton 
                        style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
                        text="clear"
                        hoverColor="gray"
                        clickColor="black"
                        onClick={() => {clearCanvas()}}
                    />
                </div>

                <div className="canvas-container">
                    <Canvas 
                    />
                </div>

                <div className="detail-container">
                    <FaceMeshCam
                        sensitivity = {sensitivity}
                    />
                </div>
            </div>
        </div>
    )
}
export default Main