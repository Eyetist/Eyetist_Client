import React, { useState } from "react";
import "./Main.css"
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import { Canvas } from '../components/canvas/Canvas'
import { useCanvas } from "../components/canvas/CanvasContext";
import EyeButton from "../components/atoms/EyeButton";
import CustomSlider from "../components/atoms/SensitivitySlider";
import EyeMouse from "../components/mouse/EyeMouse";
import CanvasSave from "./CanvasSave";


const Main = () => {
    const { clearCanvas, saveCanvas, getImageUrl } = useCanvas()
    let [canvasSaveOpen, setCanvasSaveOpen] = useState(false)
    let [saveImageLink, setSaveImageLink] = useState("")

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
                        maxRange = {10}
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
                        <CanvasSave 
                            setIsOpen={setCanvasSaveOpen}
                            link={saveImageLink}
                        />
                    </div>
    
                    <div className="detail-container">
                        <FaceMeshCam />
                    </div>
                </div>
                :    
                <div className="components-container">
                    <div className="functions-container">
                        <EyeButton 
                            style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
                            text="clear"
                            hoverColor="gray"
                            clickColor="black"
                            onClick={() => {clearCanvas()}}
                        />
    
                        <EyeButton 
                            style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white", marginTop:"100px"}}
                            text="save"
                            hoverColor="gray"
                            clickColor="black"
                            onClick={() => {
                                setSaveImageLink(getImageUrl())
                                setCanvasSaveOpen(true)
                            }}
                        />
                    </div>
    
                    <div className="canvas-container">
                        <Canvas />
                    </div>
    
                    <div className="detail-container">
                        <FaceMeshCam />
                    </div>
                </div>
            }
        </div>
    )
}
export default Main