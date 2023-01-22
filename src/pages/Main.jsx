import React, { useRef, useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CURRENT_FUNCTION,WINDOW_SIZE, STROKE_COLOR, LEFT_EYE_BLINK_VALUE, RIGHT_EYE_BLINK_VALUE } from '../recoil/Atoms';
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import { Canvas } from '../components/canvas/Canvas'
import { useCanvas } from "../components/canvas/CanvasContext";
import CustomSlider from "../components/atoms/SensitivitySlider";
import EyeMouse from "../components/mouse/EyeMouse";
import CanvasSave from "./CanvasSave";
import SmartTools from "../components/functionDetails/SmartTools";
import { useNavigate } from 'react-router-dom';
import ToolSelections from "../components/functionDetails/ToolSelections";
import MoveSelections from "../components/functionDetails/MoveSelection";
import "./Main.css"
import { imageListClasses } from "@mui/material";

const Main = () => {
    const { canvasRef } = useCanvas()
    let navigate = useNavigate();
    let SmartToolsPosition = useRef({x:0, y:0})
    let canvasSavePageTrigger = useRef(false)
    let [canvasSaveOpen, setCanvasSaveOpen] = useState(false)
    let [imgBuffer,setImgBuffer] = useState([]);
    let [bufferIdx,setBufferIdx] = useState(0);
    let [selectedButton,setSelectedButton] = useState();
    let setCurrentFunction  =useSetRecoilState(CURRENT_FUNCTION)
    let [ratio,setRatio] = useState(1);
    let canvasDivRef=useRef(null);
    let setWindowSize=useSetRecoilState(WINDOW_SIZE);
    let [smartToolsOpen, setSmartToolsOpen] = useState(false)
    let setStrokeColor = useSetRecoilState(STROKE_COLOR)


    const handleResize=()=>{
        let width=window.innerWidth;
        let height=window.innerHeight;
        setWindowSize({width:width,height:height})
    }

    useEffect( () => {
        if (!localStorage.getItem('loginMemberId') && navigate){
            navigate('/login')
        }
        setStrokeColor("#000000")
        window.addEventListener('resize',handleResize);
        handleResize();
        return()=>{
            window.removeEventListener('resize',handleResize);
        }
    }, [])

    useEffect( () => {
        if (canvasSaveOpen){
            setCurrentFunction("default")
            canvasSavePageTrigger.current = true
        }
        else{
            if (canvasSavePageTrigger.current){
                setRatio(1);
                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");
                context.drawImage(imgBuffer[bufferIdx],0,0,imgBuffer[bufferIdx].width,imgBuffer[bufferIdx].height,0,0,canvas.width,canvas.height);
                canvasSavePageTrigger.current = false;
            }
        }
    }, [canvasSaveOpen])
    
    return (
        <div className="whole-container">
            <EyeMouse 
                SmartToolsPosition = {SmartToolsPosition}
                setSmartToolsOpen = {setSmartToolsOpen}
                smartToolsOpen = {smartToolsOpen}
            />
            {
                smartToolsOpen ?
                <SmartTools 
                    setSelectedButton={setSelectedButton}
                    setBufferIdx={setBufferIdx}
                    setCanvasSaveOpen={setCanvasSaveOpen}
                    setImgBuffer={setImgBuffer}
                    bufferIdx={bufferIdx}
                    imgBuffer={imgBuffer}
                    SmartToolsPosition = {SmartToolsPosition}
                    setSmartToolsOpen = {setSmartToolsOpen}
                />
                :
                <></>
            }
            <div className="top-bar"> {/*상단 바 div*/}
                <div style={{display:"flex", width:"80%"}}>
                    <div className="eyetist-font">
                        EyeTist
                    </div>
                    
                    <div style={{marginTop: "30px"}}>
                        <CustomSlider 
                            title = "Sensitivity"
                            maxRange = {10}
                            width = "200px"
                            height = "10px"
                        />
                    </div>                    
                </div>
                <div style={{display:"flex", height:"100%", width:"20%", alignItems: "center"}}>
                    <MoveSelections 
                        currentPage = "main"
                    />
                </div>
            </div>
            {
                canvasSaveOpen ?
                <div className="components-container">
                    <div className="functions-container"/>
                    <div className="canvas-container">
                        <div style={{width: "100%", height:"100%", display:'flex', alignItems: "center", justifyContent: "center"}}>{/* backgroundColor: "#313336"}}> */}
                            <CanvasSave 
                                setIsOpen={setCanvasSaveOpen}
                                link={imgBuffer[bufferIdx].src}
                            />
                        </div>
                    </div>
    
                    <div className="right-container">
                        <div className="cam-container">
                            <FaceMeshCam />
                        </div>
                    </div>
                </div>
                :    
                <div className="components-container">
                    <div className="functions-container">
                        <ToolSelections 
                            setSelectedButton={setSelectedButton}
                            setBufferIdx={setBufferIdx}
                            setCanvasSaveOpen={setCanvasSaveOpen}
                            setImgBuffer={setImgBuffer}
                            bufferIdx={bufferIdx}
                            imgBuffer={imgBuffer}
                        />
                    </div>
    
                    <div className="canvas-container" ref={canvasDivRef}>
                        <Canvas
                            imgBuffer={imgBuffer}
                            setImgBuffer={setImgBuffer}
                            bufferIdx={bufferIdx}
                            setBufferIdx={setBufferIdx}
                            ratio={ratio}
                            setRatio={setRatio}
                            canvasDivRef={canvasDivRef}

                            smartToolsOpen = {smartToolsOpen}
                        />
                    </div>
    
                    <div className="right-container">
                        <div className="cam-container" style={{height:window.innerHeight * 0.2}}>
                            <FaceMeshCam />
                        </div>

                        <div className="detail-container">
                            {selectedButton}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default Main