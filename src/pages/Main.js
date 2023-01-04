import React, { useEffect, useState } from "react";
import "./Main.css"
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import { Canvas } from '../components/canvas/Canvas'
import { useRecoilValue } from "recoil";
import { MOUSE_POS } from '../recoil/Atoms';
import { ClearCanvasButton } from '../components/canvas/ClearCanvasButton';
import CustomSlider from "../components/atoms/CustomSlider";

const Main = () => {
    let mousePos = useRecoilValue(MOUSE_POS)
    let [sensitivity, SetSensitivity] = useState(3);

    return (
        <div className="whole-container">
            <img
                src='https://www.pngarts.com/files/10/Circle-PNG-Image-Background.png'
                alt="cursor"
                style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px"}}
            />
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

            </div>

            <div className="components-container">
                
                <div className="functions-container">
                    <ClearCanvasButton />
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
            {/* <Canvas />
            <ClearCanvasButton />
            <FaceMeshCam /> */}
        </div>
    )
}
export default Main