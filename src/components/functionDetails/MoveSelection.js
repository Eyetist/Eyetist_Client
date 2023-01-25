import EyeButton from "../atoms/EyeButton"
import { FaPowerOff } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"
import { useNavigate } from 'react-router-dom';
import { WINDOW_SIZE } from '../../recoil/Atoms';
import { useRecoilValue } from "recoil";


const MoveSelections = (props) => {
    let navigate = useNavigate();
    let windowSize=useRecoilValue(WINDOW_SIZE);

    const TOOL_BUTTON_SIZE = windowSize.width * 0.03
    const TOOL_BUTTON_FONT_SIZE = windowSize.width * 0.015

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