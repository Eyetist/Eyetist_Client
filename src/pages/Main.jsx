import React, { useRef, useState, useEffect } from "react";
import "./Main.css"
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import { Canvas } from '../components/canvas/Canvas'
import { useCanvas } from "../components/canvas/CanvasContext";
import EyeButton from "../components/atoms/EyeButton";
import CustomSlider from "../components/atoms/SensitivitySlider";
import EyeMouse from "../components/mouse/EyeMouse";
import CanvasSave from "./CanvasSave";
import ColorSelection from "../components/functionDetails/ColorSelection";
import WidthSelection from "../components/functionDetails/WidthSelection";

const Main = () => {
    const { canvasRef, clearCanvas, getImageUrl, setDrawMode, setEraseMode, undo } = useCanvas()
    let canvasSavePageTrigger = useRef(false)
    let [canvasSaveOpen, setCanvasSaveOpen] = useState(false)
    let [saveImageLink, setSaveImageLink] = useState("")
    let [imgBuffer,setImgBuffer] = useState([]);
    let [selectedButton,setSelectedButton]=useState("draw");
    let step = -1;

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

    useEffect( () => {
        if (canvasSaveOpen){
            canvasSavePageTrigger.current = true
        }
        else{
            if (canvasSavePageTrigger.current){
                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");
                const image = new Image();

                image.src = saveImageLink;
                image.onload=function(){
                    context.drawImage(image,0,0);
                }

                canvasSavePageTrigger.current = false;
            }
        }
    }, [canvasSaveOpen])

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
                        <div style={{width: "100%", height:"100%", display:'flex', alignItems: "center", justifyContent: "center"}}>{/* backgroundColor: "#313336"}}> */}
                            <CanvasSave 
                                setIsOpen={setCanvasSaveOpen}
                                link={saveImageLink}
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
                        <Canvas
                            imgBuffer={imgBuffer}
                            setImgBuffer={setImgBuffer}
                        />
                    </div>
    
                    <div className="right-container">
                        <div className="cam-container">
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