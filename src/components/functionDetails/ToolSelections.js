import EyeButton from "../atoms/EyeButton"
import ColorSelection from "../../components/functionDetails/ColorSelection";
import ShapeSelection from "../../components/functionDetails/ShapeSelection";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CURRENT_FUNCTION,WINDOW_SIZE } from '../../recoil/Atoms';
import { useCanvas } from "../../components/canvas/CanvasContext";
import { BiRefresh } from "react-icons/bi"
import { FaRedoAlt, FaUndoAlt } from "react-icons/fa"
import { RiEraserFill } from "react-icons/ri"
import { VscSaveAs,VscSave } from "react-icons/vsc"
import { BsPencilFill, BsZoomIn, BsZoomOut, BsPaintBucket, BsFillSave2Fill } from "react-icons/bs"
import { reSavePicture } from "../../api/member/MemberAPI";

const ToolSelections = (props) => {

    let windowSize=useRecoilValue(WINDOW_SIZE);
    const {clearCanvas, setDrawMode, setEraseMode, ReDoAndUnDo } = useCanvas()
    let setCurrentFunction = useSetRecoilState(CURRENT_FUNCTION)

    const TOOL_BUTTON_SIZE = windowSize.width * 0.04
    const TOOL_BUTTON_FONT_SIZE = windowSize.width * 0.02

    const toolButtonStyle = {
        width:TOOL_BUTTON_SIZE, 
        height:TOOL_BUTTON_SIZE, 
        fontSize:TOOL_BUTTON_FONT_SIZE,
        borderRadius:"5px", 
        backgroundColor:"inherit",
        color: "white",
        border: "1px solid #B4A5A5",
        marginTop: "5px",
        marginBottom: "5px",
    }
    const diagramImage = {
        diagram: require('../shapes/diagram.png')
    }

    useEffect( () => {
        selectDraw()
    }, [])

    function selectDraw(){
        setDrawMode();
        setCurrentFunction("draw");
        props.setSelectedButton(
            <ColorSelection/>
        )
    }

    function selectFill(){
        setCurrentFunction("fill")
    }

    function selectErase(){
        setEraseMode();
        setCurrentFunction("erase");
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

    function selectShape(){
        setCurrentFunction("shape")
        props.setSelectedButton(
            <ShapeSelection/>
        )
    }

    function overWrite(){
        reSavePicture(props.link,props.blobName,localStorage.getItem('loginMemberId'), props.inputName, "inherit")
        .then( (res) => {
            console.log(res);
            if (res.status === 200){
                props.setShowSaveSuccess(true)
                setTimeout(function(){
                    props.setShowSaveSuccess(false)
                }, 2000)
            }
        })
    }

    return(
        <div style={{width:"100%", height:"80%", marginTop:"20%", display:"flex", flexWrap:"wrap", backgroundColor:"rgb(49, 51, 54)", alignItems:"center", justifyContent: "center"}}>
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

            <EyeButton 
                style={toolButtonStyle}
                text={<VscSave />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {
                    if(props.blobName===""){
                        props.setCanvasSaveOpen(true)
                    }
                    else{
                        overWrite();
                    }
                }}
            />

            <EyeButton 
                style={toolButtonStyle}
                text={<VscSaveAs />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {
                    props.setCanvasSaveOpen(true)
                }}
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
    )
}

export default ToolSelections;