import React, {useRef, useState, useEffect} from "react";
import EyeButton from "../components/atoms/EyeButton";
import EyeMouse from "../components/mouse/EyeMouse";
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import MoveSelections from "../components/functionDetails/MoveSelection";
import ModeSelection from "../components/functionDetails/ModeSelection";
import EyeCard from "../components/atoms/EyeCard";
import './StartPage.css'
import { BiRefresh } from "react-icons/bi"
import { FaRedoAlt, FaUndoAlt } from "react-icons/fa"
import { AiOutlinePause } from "react-icons/ai"
import { RiEraserFill, RiMouseFill } from "react-icons/ri"
import { BsPencilFill, BsZoomIn, BsZoomOut, BsPaintBucket,BsFillPlayFill } from "react-icons/bs"
import { VscSaveAs,VscSave } from "react-icons/vsc"
import { IS_SMART_TOOLS_OPEN } from "../recoil/Atoms";
import { useRecoilValue } from "recoil";
import SensitivitySmartTools from "../components/functionDetails/SensitivitySmartTools";

const VideoPage = () =>{
    let [category, setCategory] = useState("drawingTools")
    let [videoPlay, setVideoPlay] = useState(false)
    let [videoSource, setVideoSource] = useState("")
    let videoRef = useRef(null)
    
    let smartToolsOpen = useRecoilValue(IS_SMART_TOOLS_OPEN)
    let SmartToolsPosition = useRef({x:0, y:0})

    const TOOL_BUTTON_SIZE = window.innerWidth * 0.045
    const TOOL_BUTTON_FONT_SIZE = window.innerWidth * 0.02

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

    let informationContent = [
        "Drawing tools and gallery usage instructions are provided.",
        "Click on the button on the right to play a video about how to use it.",
    ]

    const videos = {
        pen : require('../video/Pen.mp4'),
        paint : require('../video/Fill.mp4'),
        erase : require('../video/Eraser.mp4'),
        shape : require('../video/Shape.mp4'),
        refresh: require('../video/Refresh.mp4'),
        redoUndo : require('../video/RedoUndo.mp4'),
        zoomInOut : require('../video/ZoomInZoomOut.mp4'),
        save : require('../video/Save.mp4'),
        sensitivity : require('../video/Sensitivity.mp4'),
        pause : require('../video/PausePlay.mp4'),
        smartTools : require('../video/SmartTools.mp4'),

        myGallery : require('../video/MyGallery.mp4'),
        othersGallery : require('../video/OthersGallery.mp4'),
        gallerySmartTools : require('../video/GallerySmartTools.mp4'),
    }

    const diagramImage = {
        diagram: require('../components/shapes/diagram.png')
    }

    useEffect( () => {
        if (videoRef.current){
            if (!videoRef.current.paused){// -> false 면 재생중
                videoRef.current.load()
                videoRef.current.play()
            }
            else{
                videoRef.current.play()
            }
        }
    },[videoSource])

    return(
        <div className = "information-main-container">
            <ModeSelection />
            <MoveSelections 
                currentPage = "video"
            />
            <ul className="lines">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <EyeMouse 
                SmartToolsPosition = {SmartToolsPosition}
            />
            {
                smartToolsOpen ?
                <SensitivitySmartTools 
                    currentPage = "video"
                    SmartToolsPosition = {SmartToolsPosition}
                />
                :
                <></>
            }
            <div className="start-page-top-container">
                <div className='gallery-top-buttons'>
                </div>
                <div className = "start-page-title">
                    EyeTist
                </div>
                <div className="start-page-cam">
                    <FaceMeshCam />
                </div>
            </div>

            <div className = "start-page-body-container">
                <div className = "box-container">
                    {
                        videoPlay ?
                            <video ref = {videoRef} width="70%" height="100%">
                                <source src={videoSource} type="video/mp4"/>
                            </video>
                        :
                            <EyeCard 
                                style={{
                                    width: "70%",
                                    height: "100%",
                                    backgroundColor: "#f46969",
                                    borderRadius: "20px",
                                    marginLeft: "30px",
                                    marginRight: "30px"
                                }}
                                title="< How to Play? >"
                                content={informationContent}
                                hoverColor="#f46969"
                                clickColor="#f46969"
                                onClick={() => {}}
                            />
                    }
                    <div style={{width: "30%", height:"100%"}}>
                        <div style={{display:'flex', height:"auto"}}>
                            <EyeButton 
                                style={{width:"auto", height:"30px", borderTopLeftRadius:"5px", borderTopRightRadius:"5px", backgroundColor: category === "drawingTools" ? "rgb(49, 51, 54)" : "gainsboro", color:"white", paddingLeft:"10px", paddingRight:"10px"}}
                                text="DrawingTools"
                                hoverColor="gray"
                                clickColor="black"
                                onClick={() => {setCategory("drawingTools")}}
                            />
                            <EyeButton 
                                style={{width:"auto", height:"30px", borderTopLeftRadius:"5px", borderTopRightRadius:"5px", backgroundColor: category === "drawingTools" ? "gainsboro" : "rgb(49, 51, 54)", color:"white", marginLeft:"2px", paddingLeft:"10px", paddingRight:"10px"}}
                                text="Gallery"
                                hoverColor="gray"
                                clickColor="black"
                                onClick={() => {setCategory("gallery")}}
                            />
                        </div>

                        {
                            category === "drawingTools" ?
                            <>
                                <div style={{width:"100%", display:"flex", backgroundColor:"rgb(49, 51, 54)", alignItems:"center", justifyContent: "center"}}>
                                    <EyeButton 
                                        style={toolButtonStyle}
                                        text={<BsPencilFill />}
                                        hoverColor="pink"
                                        clickColor="black"
                                        onClick={() => {
                                            setVideoSource(videos.pen)
                                            setVideoPlay(true)
                                        }}
                                    />

                                    <EyeButton
                                        style={toolButtonStyle}
                                        text={<BsPaintBucket />}
                                        hoverColor="pink"
                                        clickColor="black"
                                        onClick={() => {
                                            setVideoSource(videos.paint)
                                            setVideoPlay(true)
                                        }}
                                    />
                                    <EyeButton 
                                        style={toolButtonStyle}
                                        text={<RiEraserFill />}
                                        hoverColor="pink"
                                        clickColor="black"
                                        onClick={() => {
                                            setVideoSource(videos.erase)
                                            setVideoPlay(true)
                                        }}
                                    />
                                    <EyeButton 
                                        style={toolButtonStyle}
                                        text={<img src={diagramImage.diagram} style={{width:"100%", height:"auto", color : "white", paddingLeft:"5px" ,paddingRight:"5px",paddingTop:"5px",paddingBottom:"5px"}} />}
                                        hoverColor="pink"
                                        clickColor="black"
                                        onClick={() => {
                                            setVideoSource(videos.shape)
                                            setVideoPlay(true)
                                        }}
                                    />
                                </div>
                                <div style={{width:"100%", display:"flex", backgroundColor:"rgb(49, 51, 54)", alignItems:"center", justifyContent: "center"}}>
                                    <EyeButton 
                                        style={toolButtonStyle}
                                        text={<BiRefresh />}
                                        hoverColor="pink"
                                        clickColor="black"
                                        onClick={() => {
                                            setVideoSource(videos.refresh)
                                            setVideoPlay(true)
                                        }}
                                    />

                                    <EyeButton 
                                        style={{
                                            width:TOOL_BUTTON_SIZE * 2, 
                                            height:TOOL_BUTTON_SIZE, 
                                            fontSize:TOOL_BUTTON_FONT_SIZE,
                                            borderRadius:"5px", 
                                            backgroundColor:"inherit",
                                            color: "white",
                                            border: "1px solid #B4A5A5",
                                            marginTop: "5px",
                                            marginBottom: "5px",
                                        }}
                                        text={<><FaUndoAlt />&nbsp;&nbsp;<FaRedoAlt /></>}
                                        hoverColor="pink"
                                        clickColor="black"
                                        onClick={() => {
                                            setVideoSource(videos.redoUndo)
                                            setVideoPlay(true)
                                        }}
                                    />
                                </div>
                                <div style={{width:"100%", display:"flex", backgroundColor:"rgb(49, 51, 54)", alignItems:"center", justifyContent: "center"}}>
                                    <EyeButton 
                                        style={{
                                            width:TOOL_BUTTON_SIZE * 2, 
                                            height:TOOL_BUTTON_SIZE, 
                                            fontSize:TOOL_BUTTON_FONT_SIZE,
                                            borderRadius:"5px", 
                                            backgroundColor:"inherit",
                                            color: "white",
                                            border: "1px solid #B4A5A5",
                                            marginTop: "5px",
                                            marginBottom: "5px",
                                        }}
                                        text={<><BsZoomIn />&nbsp;&nbsp;<BsZoomOut /></>}
                                        hoverColor="pink"
                                        clickColor="black"
                                        onClick={() => {
                                            setVideoSource(videos.zoomInOut)
                                            setVideoPlay(true)
                                        }}
                                    />
                                </div>
                                <div style={{width:"100%", display:"flex", backgroundColor:"rgb(49, 51, 54)", alignItems:"center", justifyContent: "center"}}>
                                    <EyeButton 
                                        style={{
                                            width:TOOL_BUTTON_SIZE * 2, 
                                            height:TOOL_BUTTON_SIZE, 
                                            fontSize:TOOL_BUTTON_FONT_SIZE,
                                            borderRadius:"5px", 
                                            backgroundColor:"inherit",
                                            color: "white",
                                            border: "1px solid #B4A5A5",
                                            marginTop: "5px",
                                            marginBottom: "5px",
                                        }}
                                        text={<><VscSave />&nbsp;&nbsp;<VscSaveAs /></>}
                                        hoverColor="pink"
                                        clickColor="black"
                                        onClick={() => {
                                            setVideoSource(videos.save)
                                            setVideoPlay(true)
                                        }}
                                    />
                                </div>
                                <div style={{width:"100%", display:"flex", backgroundColor:"rgb(49, 51, 54)", alignItems:"center", justifyContent: "center"}}>
                                    <EyeButton 
                                        style={{
                                            width:TOOL_BUTTON_SIZE * 3, 
                                            height:TOOL_BUTTON_SIZE, 
                                            fontSize:TOOL_BUTTON_FONT_SIZE,
                                            borderRadius:"5px", 
                                            backgroundColor:"inherit",
                                            color: "white",
                                            border: "1px solid #B4A5A5",
                                            marginTop: "5px",
                                            marginBottom: "5px",
                                        }}
                                        text="SmartTools"
                                        hoverColor="pink"
                                        clickColor="black"
                                        onClick={() => {
                                            setVideoSource(videos.smartTools)
                                            setVideoPlay(true)
                                        }}
                                    />
                                </div>
                                <div style={{width:"100%", display:"flex", backgroundColor:"rgb(49, 51, 54)", alignItems:"center", justifyContent: "center"}}>
                                    <EyeButton 
                                        style={toolButtonStyle}
                                        text={<RiMouseFill />}
                                        hoverColor="pink"
                                        clickColor="black"
                                        onClick={() => {
                                            setVideoSource(videos.sensitivity)
                                            setVideoPlay(true)
                                        }}
                                    />
                                    <EyeButton 
                                        style={{
                                            width:TOOL_BUTTON_SIZE * 2, 
                                            height:TOOL_BUTTON_SIZE, 
                                            fontSize:TOOL_BUTTON_FONT_SIZE,
                                            borderRadius:"5px", 
                                            backgroundColor:"inherit",
                                            color: "white",
                                            border: "1px solid #B4A5A5",
                                            marginTop: "5px",
                                            marginBottom: "5px",
                                        }}
                                        text={<><BsFillPlayFill />&nbsp;<AiOutlinePause /></>}
                                        hoverColor="pink"
                                        clickColor="black"
                                        onClick={() => {
                                            setVideoSource(videos.pause)
                                            setVideoPlay(true)
                                        }}
                                    />
                                </div>
                            </>
                            :
                            <>
                                <div style={{width:"100%", display:"flex", backgroundColor:"rgb(49, 51, 54)", alignItems:"center", justifyContent: "center"}}>
                                    <EyeButton 
                                        style={{
                                            width:TOOL_BUTTON_SIZE * 3, 
                                            height:TOOL_BUTTON_SIZE, 
                                            fontSize:TOOL_BUTTON_FONT_SIZE,
                                            borderRadius:"5px", 
                                            backgroundColor:"inherit",
                                            color: "white",
                                            border: "1px solid #B4A5A5",
                                            marginTop: "5px",
                                            marginBottom: "5px",
                                        }}
                                        text="MyGallery"
                                        hoverColor="pink"
                                        clickColor="black"
                                        onClick={() => {
                                            setVideoSource(videos.myGallery)
                                            setVideoPlay(true)
                                        }}
                                    />
                                </div>
                                <div style={{width:"100%", display:"flex", backgroundColor:"rgb(49, 51, 54)", alignItems:"center", justifyContent: "center"}}>
                                    <EyeButton 
                                        style={{
                                            width:TOOL_BUTTON_SIZE * 3, 
                                            height:TOOL_BUTTON_SIZE, 
                                            fontSize:TOOL_BUTTON_FONT_SIZE,
                                            borderRadius:"5px", 
                                            backgroundColor:"inherit",
                                            color: "white",
                                            border: "1px solid #B4A5A5",
                                            marginTop: "5px",
                                            marginBottom: "5px",
                                        }}
                                        text="OthersGallery"
                                        hoverColor="pink"
                                        clickColor="black"
                                        onClick={() => {
                                            setVideoSource(videos.othersGallery)
                                            setVideoPlay(true)
                                        }}
                                    />
                                </div>
                                <div style={{width:"100%", display:"flex", backgroundColor:"rgb(49, 51, 54)", alignItems:"center", justifyContent: "center"}}>
                                    <EyeButton 
                                        style={{
                                            width:TOOL_BUTTON_SIZE * 3, 
                                            height:TOOL_BUTTON_SIZE, 
                                            fontSize:TOOL_BUTTON_FONT_SIZE,
                                            borderRadius:"5px", 
                                            backgroundColor:"inherit",
                                            color: "white",
                                            border: "1px solid #B4A5A5",
                                            marginTop: "5px",
                                            marginBottom: "5px",
                                        }}
                                        text="SmartTools"
                                        hoverColor="pink"
                                        clickColor="black"
                                        onClick={() => {
                                            setVideoSource(videos.gallerySmartTools)
                                            setVideoPlay(true)
                                        }}
                                    />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default VideoPage;