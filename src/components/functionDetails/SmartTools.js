import EyeButton from "../atoms/EyeButton"
import ColorSelection from "./ColorSelection";
import { useSetRecoilState } from "recoil";
import { CURRENT_FUNCTION } from '../../recoil/Atoms';
import { useCanvas } from "../canvas/CanvasContext";
import { useNavigate } from 'react-router-dom';
import { BiRefresh } from "react-icons/bi"
import { FaPowerOff } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"
import { FaRedoAlt, FaUndoAlt } from "react-icons/fa"
import { RiEraserFill, RiCloseCircleFill } from "react-icons/ri"
import { BsPencilFill, BsZoomIn, BsZoomOut, BsPaintBucket, BsFillSave2Fill } from "react-icons/bs"

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

const SmartTools = (props) => {
    const {clearCanvas, setDrawMode, setEraseMode, ReDoAndUnDo } = useCanvas()
    let setCurrentFunction = useSetRecoilState(CURRENT_FUNCTION)
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
        navigate('/begin')
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
    }

    function zoomOut(){
        setCurrentFunction("zoom out")
        props.setSelectedButton(
            <ColorSelection/>
        )
    } 

    return(
        <div style={toolContainerStyle}>
            <div style={{border: "1px solid #B4A5A5", borderRadius:"30px", paddingRight:"10px"}}>
                <div style={{display:'flex'}}>
                    <EyeButton 
                        style={toolButtonStyle}
                        text={<BiRefresh />}
                        hoverColor="pink"
                        clickColor="black"
                        onClick={() => {clearCanvas(props.setImgBuffer,props.imgBuffer,props.setBufferIdx,props.bufferIdx)}}
                    />

                    <EyeButton id="draw"
                        style={toolButtonStyle}
                        text={<BsPencilFill />}
                        hoverColor="pink"
                        clickColor="black"
                        onClick={() => {selectDraw()}}
                    />
                </div>

                <div style={{display:'flex'}}>
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
                </div>
                <div style={{display:'flex'}}>
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
                </div>
            </div>
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
            </div>
        </div>
    )
}

export default SmartTools;