import React, { useRef, useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { CURRENT_FUNCTION } from '../recoil/Atoms';
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import { Canvas } from '../components/canvas/Canvas'
import { useCanvas } from "../components/canvas/CanvasContext";
import CustomSlider from "../components/atoms/SensitivitySlider";
import EyeMouse from "../components/mouse/EyeMouse";
import CanvasSave from "./CanvasSave";
import ToolSelections from "../components/functionDetails/ToolSelections";
import "./Main.css"

const Main = () => {
    const { canvasRef } = useCanvas()
    let canvasSavePageTrigger = useRef(false)
    let [canvasSaveOpen, setCanvasSaveOpen] = useState(false)
    let [imgBuffer,setImgBuffer] = useState([]);
    let [bufferIdx,setBufferIdx] = useState(0);
    let [selectedButton,setSelectedButton] = useState();
    let setCurrentFunction  =useSetRecoilState(CURRENT_FUNCTION)
    let [ratio,setRatio] = useState(1);

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
                const image = new Image();

                image.src = imgBuffer[bufferIdx];
                image.onload=function(){
                    context.drawImage(image,0,0);
                }

                canvasSavePageTrigger.current = false;
            }
        }
    }, [canvasSaveOpen])
    
    return (
        <div className="whole-container">
            <EyeMouse />
            <div className="top-bar"> {/*상단 바 div*/}
                <div className="eyetist-font">
                    EyeTist
                </div>
                
                <div style={{marginTop: "30px"}}>
                    <CustomSlider 
                        title = "Sensitivity"
                        maxRange = {5}
                        width = "200px"
                        height = "10px"
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
                                link={imgBuffer[bufferIdx]}
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
                            bufferIdx={bufferIdx}
                            imgBuffer={imgBuffer}
                        />
                    </div>
    
                    <div className="canvas-container">
                        <Canvas
                            imgBuffer={imgBuffer}
                            setImgBuffer={setImgBuffer}
                            bufferIdx={bufferIdx}
                            setBufferIdx={setBufferIdx}
                            ratio={ratio}
                            setRatio={setRatio}
                        />
                    </div>
    
                    <div className="right-container">
                        <div className="cam-container" style={{height:window.innerHeight * 0.2}}>
                            <FaceMeshCam
                            />
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