import React, { useEffect, useState } from "react";
import "./Main.css"
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import { Canvas } from '../components/canvas/Canvas'
import { useRecoilValue } from "recoil";
import { MOUSE_POS, IS_LEFT_EYE_BLINK, IS_RIGHT_EYE_BLINK } from '../recoil/Atoms';
import { ClearCanvasButton } from '../components/canvas/ClearCanvasButton';
import EyeButton from "../components/atoms/EyeButton";
import CustomSlider from "../components/atoms/CustomSlider";

const cursorImage = {
    defaultCursor: require('./defaultCursor.png'),
    leftEyeClickCursor: require('./leftEyeClickCursor.png'),
    checkCursor: require('./checkCursor.png')
}

const Main = () => {
    let mousePos = useRecoilValue(MOUSE_POS)
    let isLeftEyeBlink = useRecoilValue(IS_LEFT_EYE_BLINK)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)
    let [sensitivity, SetSensitivity] = useState(3);

    return (
        <div className="whole-container">
            {   
                isRightEyeBlink ? 
                    <img
                        src={cursorImage.checkCursor}
                        alt="cursor"
                        style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px"}}
                    />
                :
                    isLeftEyeBlink ? 
                        <img
                            src={cursorImage.leftEyeClickCursor}
                            alt="cursor"
                            style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px"}}
                        />
                    :
                        <img
                            src={cursorImage.defaultCursor}
                            alt="cursor"
                            style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px"}}
                        />
            }
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

                    <EyeButton 
                        style={{width:"200px", height:"50px", borderRadius:"5px", backgroundColor:"white"}}
                        title="test"
                        hoverColor="gray"
                        clickColor="black"
                        onClick={() => {console.log("눌렸어용")}}
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
            {/* <Canvas />
            <ClearCanvasButton />
            <FaceMeshCam /> */}
        </div>
    )
}
export default Main