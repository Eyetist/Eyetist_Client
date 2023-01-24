import React, {useState} from "react";
import EyeButton from "../atoms/EyeButton"
import ColorSelection from "./ColorSelection";
import { useSetRecoilState,useRecoilState } from "recoil";
import { CURRENT_FUNCTION,IS_DRAWING } from '../../recoil/Atoms';
import { useCanvas } from "../canvas/CanvasContext";
import { useNavigate } from 'react-router-dom';
import { BiRefresh } from "react-icons/bi"
import { FaPowerOff } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"
import { FaRedoAlt, FaUndoAlt } from "react-icons/fa"
import { AiOutlinePause } from "react-icons/ai"
import { RiEraserFill, RiCloseCircleFill, RiMouseFill } from "react-icons/ri"
import { BsPencilFill, BsZoomIn, BsZoomOut, BsPaintBucket, BsFillSave2Fill,BsFillPlayFill } from "react-icons/bs"
import { IoColorPalette } from "react-icons/io5"
import ShapeSelection from "../../components/functionDetails/ShapeSelection";

const TOOL_BUTTON_SIZE = window.innerWidth * 0.04
const TOOL_BUTTON_FONT_SIZE = window.innerWidth * 0.02

const toolButtonStyle = {
    width:TOOL_BUTTON_SIZE, 
    height:TOOL_BUTTON_SIZE, 
    fontSize:TOOL_BUTTON_FONT_SIZE,
    borderRadius:TOOL_BUTTON_SIZE, 
    backgroundColor:"rgb(49, 51, 54)", 
    color: "white",
    border: "1px solid #B4A5A5",
    marginLeft: "10px",
    marginTop: "5px",
    marginBottom: "5px",
}

const diagramImage = {
    diagram: require('../shapes/diagram.png')
}

const SmartTools = (props) => {
    const {clearCanvas, setDrawMode, setEraseMode, ReDoAndUnDo } = useCanvas()
    let setCurrentFunction = useSetRecoilState(CURRENT_FUNCTION)
    let [isDrawing,setIsDrawing]=useRecoilState(IS_DRAWING);
    let [isPaletteMode, setIsPaletteMode] = useState(false)
    let navigate = useNavigate();

    const toolContainerStyle = {
        position: 'absolute', 
        display: 'flex',
        paddingLeft: props.SmartToolsPosition.current.x + 50, 
        paddingTop: props.SmartToolsPosition.current.y - ((window.innerWidth * 0.04 * 5) / 2), 
        alignItems:"center", 
        justifyContent: "center", 
        zIndex:'100'
    }

    function goBack(){
        navigate('/setting')
    }

    function logOut(){
        localStorage.clear()
        navigate('/')
    }

    function selectDraw(){
        setDrawMode();
        setCurrentFunction("draw");
        props.setSelectedButton(
            <ColorSelection/>
        )
        props.setSmartToolsOpen(false)
    }

    function selectFill(){
        setCurrentFunction("fill")
        props.setSmartToolsOpen(false)
    }

    function selectErase(){
        setEraseMode();
        setCurrentFunction("erase");
        props.setSmartToolsOpen(false)
    }

    function selectUndo(){
        if(props.bufferIdx>0){
            ReDoAndUnDo(props.imgBuffer[props.bufferIdx-1]);
            props.setBufferIdx(props.bufferIdx-1);
        }
    }

    function selectRedo(){
        if(props.bufferIdx<props.imgBuffer.length-1){
            ReDoAndUnDo(props.imgBuffer[props.bufferIdx+1]);
            props.setBufferIdx(props.bufferIdx+1);
        }
    }

    function zoomIn(){
        setCurrentFunction("zoom in")
        props.setSelectedButton(
            <ColorSelection/>
        )
        props.setSmartToolsOpen(false)
    }

    function zoomOut(){
        setCurrentFunction("zoom out")
        props.setSelectedButton(
            <ColorSelection/>
        )
        props.setSmartToolsOpen(false)
    }
    
    function selectShape(){
        setCurrentFunction("shape")
        props.setSelectedButton(
            <ShapeSelection/>
        )
        props.setSmartToolsOpen(false)
    }
    

    return(
        <div style={toolContainerStyle}>
            {
                isPaletteMode ?
                <div style={{border: "1px solid #B4A5A5", borderRadius:"30px", backgroundColor:"black"}}>
                    <ColorSelection/>
                </div>
                :
                <div style={{border: "1px solid #B4A5A5", borderRadius:"30px", paddingRight:"10px"}}>
                    <div style={{display:'flex'}}>
                        <EyeButton 
                            style={toolButtonStyle}
                            text={<BiRefresh />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => {clearCanvas(props.setImgBuffer,props.imgBuffer,props.setBufferIdx,props.bufferIdx)}}
                        />
                        <EyeButton 
                            style={toolButtonStyle}
                            text={<RiMouseFill />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => {props.setIsOpenSensitivity(!props.isOpenSensitivity)}}
                        />
                        {
                            isDrawing?
                                <EyeButton 
                                    style={toolButtonStyle}
                                    text={<AiOutlinePause />}
                                    hoverColor="pink"
                                    clickColor="black"
                                    onClick={() => {setIsDrawing(false)}}
                                />
                            :
                                <EyeButton 
                                    style={toolButtonStyle}
                                    text={<BsFillPlayFill />}
                                    hoverColor="pink"
                                    clickColor="black"
                                    onClick={() => {setIsDrawing(true)}}
                                />

                        }
                    </div>
                    <div style={{display:'flex'}}>
                        <EyeButton id="draw"
                            style={toolButtonStyle}
                            text={<BsPencilFill />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => {selectDraw()}}
                        />

                        <EyeButton
                            style={toolButtonStyle}
                            text={<IoColorPalette />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => {setIsPaletteMode(true)}}
                        />
                        <EyeButton 
                            style={toolButtonStyle}
                            text={<BsPaintBucket />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => {selectFill()}}
                        />

                        <EyeButton 
                            style={toolButtonStyle}
                            text={<RiEraserFill />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => {selectErase()}}
                        />
                    </div>

                    <div style={{display:'flex'}}>
                        <EyeButton 
                            style={toolButtonStyle}
                            text={<FaUndoAlt />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => {selectUndo()}}
                        />

                        <EyeButton 
                            style={toolButtonStyle}
                            text={<FaRedoAlt />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => {selectRedo()}}
                        />
                        <EyeButton 
                            style={toolButtonStyle}
                            text={<BsZoomIn />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => {zoomIn()}}
                        />

                        <EyeButton 
                            style={toolButtonStyle}
                            text={<BsZoomOut />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => {zoomOut()}}
                        />
                    </div>
                    <div style={{display:'flex'}}>
                        <EyeButton 
                            style={toolButtonStyle}
                            text={<BsFillSave2Fill />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => {
                                props.setCanvasSaveOpen(true)
                                props.setSmartToolsOpen(false)
                            }}
                        />

                        <EyeButton 
                            style={toolButtonStyle}
                            text={<RiCloseCircleFill />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => {props.setSmartToolsOpen(false)}}
                        />

                        <EyeButton 
                            style={toolButtonStyle}
                            text={<img src={diagramImage.diagram} style={{width:"100%", height:"auto", color : "white", paddingLeft:"5px" ,paddingRight:"5px",paddingTop:"5px",paddingBottom:"5px"}} />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => {
                                selectShape();
                            }}
                        />
                    </div>
                </div>
            }
            <div style={{border: "1px solid #B4A5A5", borderRadius:"30px", paddingRight:"10px"}}>
                <div style={{display:'flex'}}>
                    <EyeButton 
                        style={toolButtonStyle}
                        text={<BiLogOut />}
                        hoverColor="pink"
                        clickColor="black"
                        onClick={() => {goBack()}}
                    />

                    <EyeButton 
                        style={toolButtonStyle}
                        text={<FaPowerOff />}
                        hoverColor="pink"
                        clickColor="black"
                        onClick={() => {logOut()}}
                    />
                </div>
                {
                    isPaletteMode ?
                        <EyeButton 
                            style={toolButtonStyle}
                            text={<RiCloseCircleFill />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => {props.setSmartToolsOpen(false)}}
                        />
                    :
                        <></>
                }
            </div>
        </div>
    )
}

export default SmartTools;