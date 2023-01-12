import EyeButton from "../atoms/EyeButton"
import { FaPowerOff } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"
import { BsImages } from "react-icons/bs"
import { useNavigate } from 'react-router-dom';

const TOOL_BUTTON_SIZE = window.innerWidth * 0.03
const TOOL_BUTTON_FONT_SIZE = window.innerWidth * 0.015

const toolButtonStyle = {
    width:TOOL_BUTTON_SIZE, 
    height:TOOL_BUTTON_SIZE, 
    fontSize:TOOL_BUTTON_FONT_SIZE,
    borderRadius:"5px", 
    backgroundColor:"inherit",
    color: "white",
    border: "1px solid #B4A5A5",
    marginLeft: "10px"
}

const MoveSelections = (props) => {
    let navigate = useNavigate();

    function goGallery(){
        navigate('/gallery')
    }

    function goBack(){
        navigate('/begin')
    }

    function logOut(){
        localStorage.clear()
        navigate('/')
    }

    return(
        <div style={{display:"flex"}}>
            {
                props.currentPage === "gallery" || props.currentPage === "begin"?
                <></>
                :
                <EyeButton 
                    style={toolButtonStyle}
                    text={<BsImages />}
                    hoverColor="pink"
                    clickColor="black"
                    onClick={() => {goGallery()}}
                />
            }
            {
                props.currentPage === "begin" ?
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

            <EyeButton 
                style={toolButtonStyle}
                text={<FaPowerOff />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {logOut()}}
            />
        </div>
    )
}

export default MoveSelections;