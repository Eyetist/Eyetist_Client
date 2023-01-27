import EyeButton from "../atoms/EyeButton"
import { useNavigate } from 'react-router-dom';
import { FaPowerOff } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"
import { RiCloseCircleFill } from "react-icons/ri"
import { CONTROLL_MODE } from '../../recoil/Atoms';
import { AiFillEye } from "react-icons/ai"
import { GiLips } from "react-icons/gi"
import { useRecoilState, useSetRecoilState } from "recoil";
import { MOUSE_SENSITIVITY, STROKE_COLOR,CURRENT_FUNCTION, IS_SMART_TOOLS_OPEN } from "../../recoil/Atoms";

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

const SensitivitySmartTools = (props) => {
    let navigate = useNavigate();
    let [controllMode, setControllMode] = useRecoilState(CONTROLL_MODE);
    let [mouseSensitivity, setMouseSensitivity] = useRecoilState(MOUSE_SENSITIVITY)
    let setStrokeColor=useSetRecoilState(STROKE_COLOR);
    let setCurrentFunction=useSetRecoilState(CURRENT_FUNCTION);
    let setIsSmartToolsOpen = useSetRecoilState(IS_SMART_TOOLS_OPEN)

    function minusSensitivity(){
        if (mouseSensitivity <= 1){
            setMouseSensitivity(1)
        }
        else{
            setMouseSensitivity(mouseSensitivity - 1)
        }
    }

    function plusSensitivity(){
        if (mouseSensitivity >= 10){
            setMouseSensitivity(10)
        }
        else{
            setMouseSensitivity(mouseSensitivity + 1)
        }
    }

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
        setStrokeColor("#000000");
        setCurrentFunction("default");
        setIsSmartToolsOpen(false);
        switch(props.currentPage){
            case "setting":
                navigate('/')
                break
            case "customSetting":
                navigate('/setting')
                break
            case "begin":
                navigate('/setting')
                break
            case "paint":
                navigate('/begin')
                break
            case "gallery":
                navigate('/begin')
                break
            case "video":
                navigate('/begin')
                break
            case "login":
            case "join":
                navigate('/setting')
                break
        }
    }

    function logOut(){
        setIsSmartToolsOpen(false);
        localStorage.clear()
        navigate('/')
    }

    return(
        <div style={toolContainerStyle}>
            <div style={{border: "1px solid #B4A5A5", borderRadius:"30px", paddingRight:"10px"}}>
                <div style={{display:'flex'}}>
                    <EyeButton 
                        style={toolButtonStyle}
                        text={<img src="https://cdn-icons-png.flaticon.com/512/3368/3368230.png" style={{width:"100%", height:"auto", color : "white", paddingLeft:"5px" ,paddingRight:"5px",paddingTop:"5px",paddingBottom:"5px"}} />}
                        hoverColor="pink"
                        clickColor="black"
                        onClick={() => {minusSensitivity()}}
                    />
                    <EyeButton 
                        style={toolButtonStyle}
                        text={<img src="https://cdn-icons-png.flaticon.com/512/3368/3368222.png" style={{width:"100%", height:"auto", color : "white", paddingLeft:"5px" ,paddingRight:"5px",paddingTop:"5px",paddingBottom:"5px"}} />}
                        hoverColor="pink"
                        clickColor="black"
                        onClick={() => {plusSensitivity()}}
                    />
                </div>
                <div style={{display:'flex'}}>
                    <EyeButton 
                        style={{
                            width: TOOL_BUTTON_SIZE, 
                            height: TOOL_BUTTON_SIZE, 
                            fontSize:TOOL_BUTTON_FONT_SIZE,
                            borderRadius:TOOL_BUTTON_SIZE, 
                            backgroundColor: controllMode === "eye" ? "#f46969" : "inherit",
                            color: "white",
                            border: "1px solid #B4A5A5",
                            marginLeft: "10px"
                        }}
                        text={<AiFillEye />}
                        hoverColor="#f46969"
                        clickColor="black"
                        onClick={() => {setControllMode("eye")}}
                    />

                    <EyeButton 
                        style={{
                            width: TOOL_BUTTON_SIZE, 
                            height: TOOL_BUTTON_SIZE, 
                            fontSize:TOOL_BUTTON_FONT_SIZE,
                            borderRadius:TOOL_BUTTON_SIZE, 
                            backgroundColor: controllMode === "mouth" ? "#f46969" : "inherit",
                            color: "white",
                            border: "1px solid #B4A5A5",
                            marginLeft: "10px"
                        }}
                        text={<GiLips />}
                        hoverColor="#f46969"
                        clickColor="black"
                        onClick={() => {setControllMode("mouth")}}
                    />
                </div>
            </div>

            

            <div style={{border: "1px solid #B4A5A5", borderRadius:"30px", paddingRight:"10px", marginLeft: "100px" }}>
            <div style={{display:'flex'}}>
                    {
                        props.currentPage === "intro" || props.currentPage === "information"?
                        <></>
                        :
                        <EyeButton 
                            style={toolButtonStyle}
                            text={<BiLogOut />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => {goBack()}}
                        />
                    }
                    {
                        props.currentPage === "setting" ||  props.currentPage === "customSetting" || props.currentPage === "join" || props.currentPage === "login" || props.currentPage === "information" ?
                        <></>
                        :
                        <EyeButton 
                            style={toolButtonStyle}
                            text={<FaPowerOff />}
                            hoverColor="pink"
                            clickColor="black"
                            onClick={() => {logOut()}}
                        />         
                    }
                </div>

                <EyeButton 
                    style={toolButtonStyle}
                    text={<RiCloseCircleFill />}
                    hoverColor="pink"
                    clickColor="black"
                    onClick={() => {setIsSmartToolsOpen(false)}}
                />
            </div>
        </div>
    )
}

export default SensitivitySmartTools;