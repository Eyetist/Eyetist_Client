import React, { useEffect, useState } from "react";
import "./Main.css"
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import { Canvas } from '../components/canvas/Canvas'
import { useRecoilValue } from "recoil";
import { MOUSE_POS, IS_LEFT_EYE_BLINK, IS_RIGHT_EYE_BLINK } from '../recoil/Atoms';
import EyeKeyboard from "../components/keyboard/EyeKeyboard";
import { useCanvas } from "../components/canvas/CanvasContext";
import EyeButton from "../components/atoms/EyeButton";
import CustomSlider from "../components/atoms/CustomSlider";
import ColorSelection from "../components/functionDetails/ColorSelection";
import WidthSelection from "../components/functionDetails/WidthSelection";
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
    let [selectedButton,setSelectedButton]=useState("draw");
    let [imgBuffer,setImgBuffer]=useState([]);
    var step=-1;
    const { clearCanvas,setDrawMode,setEraseMode,undo } = useCanvas()

    useEffect(()=>{
        console.log(imgBuffer);
    },[imgBuffer])

    function selectDraw(){
        setDrawMode();
        setSelectedButton("draw");
    }

    function selectErase(){
        setEraseMode();
        setSelectedButton("erase");
    }

    function selectColor(){
        setSelectedButton(
            <ColorSelection/>
        )
    }

    function selectWidth(){
        setSelectedButton(
            <WidthSelection/>
        )
    }

    useEffect(()=>{
        switch(selectedButton){
            case "draw":
                console.log("draw");
                break;
            case "erase":
                console.log("erase");
                break;
        }
    },[selectedButton])

    return (
        <div className="whole-container">
            {   
                isRightEyeBlink ? 
                    <img
                        src={cursorImage.checkCursor}
                        alt="cursor"
                        style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999'}}
                    />
                :
                    isLeftEyeBlink ? 
                        <img
                            src={cursorImage.leftEyeClickCursor}
                            alt="cursor"
                            style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999'}}
                        />
                    :
                        <img
                            src={cursorImage.defaultCursor}
                            alt="cursor"
                            style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999'}}
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
                {/* <EyeKeyboard /> */}
            </div>

            <div className="components-container">
                
                <div className="functions-container">
                    <EyeButton 
                        style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
                        text="clear"
                        hoverColor="gray"
                        clickColor="black"
                        onClick={() => {clearCanvas();setSelectedButton("clear")}}
                    />

                    <EyeButton id="draw"
                        style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
                        text="draw"
                        hoverColor="gray"
                        clickColor="black"
                        onClick={() => {selectDraw()}}
                    />

                    <EyeButton 
                        style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
                        text="erase"
                        hoverColor="gray"
                        clickColor="black"
                        onClick={() => {selectErase()}}
                    />

                    <EyeButton 
                        style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
                        text="color"
                        hoverColor="gray"
                        clickColor="black"
                        onClick={() => {selectColor()}}
                    />

                    <EyeButton 
                        style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
                        text="width"
                        hoverColor="gray"
                        clickColor="black"
                        onClick={() => {selectWidth()}}
                    />

                    <EyeButton 
                        style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
                        text="undo"
                        hoverColor="gray"
                        clickColor="black"
                        onClick={() => {undo(imgBuffer[imgBuffer.length-2])}}
                    />
                </div>

                <div className="canvas-container">
                    <Canvas 
                        imgBuffer={imgBuffer}
                        setImgBuffer={setImgBuffer}
                    />
                </div>

                <div className="right-container">
                    <div className="cam-container">
                        <FaceMeshCam
                            sensitivity = {sensitivity}
                        />
                    </div>

                    <div className="detail-container">
                        {selectedButton}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Main