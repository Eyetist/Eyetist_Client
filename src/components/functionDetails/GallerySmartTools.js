import { useEffect } from "react";
import EyeButton from "../atoms/EyeButton"
import { useNavigate } from 'react-router-dom';
import { FaPowerOff } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"
import {  IoPersonSharp } from "react-icons/io5"
import { IoIosPeople } from "react-icons/io"
import { BsShare, BsShieldLock } from "react-icons/bs"
import { RiCloseCircleFill } from "react-icons/ri"


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

const GallerySmartTools = (props) => {
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

    return(
        <div style={toolContainerStyle}>
            <div style={{border: "1px solid #B4A5A5", borderRadius:"30px", paddingRight:"10px"}}>
                <div style={{display:'flex'}}>
                    <EyeButton 
                        style={toolButtonStyle}
                        text={<IoPersonSharp />}
                        hoverColor="pink"
                        clickColor="black"
                        onClick={() => props.setIsMyGallery(true)}
                    />

                    <EyeButton
                        style={toolButtonStyle}
                        text={<IoIosPeople />}
                        hoverColor="pink"
                        clickColor="black"
                        onClick={() => props.setIsMyGallery(false)}
                    />
                </div>
                {
                    props.isMyGallery ? 
                    <div style={{display:'flex'}}>
                        <EyeButton
                            style={toolButtonStyle}
                            text={<BsShieldLock />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => props.setVisibility("private")}
                        />
                        <EyeButton 
                            style={toolButtonStyle}
                            text={<BsShare />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => props.setVisibility("public")}
                        />
                    </div>
                    :
                    <></>
                }
                <div>
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

export default GallerySmartTools;