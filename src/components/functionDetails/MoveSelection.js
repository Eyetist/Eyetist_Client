import EyeButton from "../atoms/EyeButton"
import { FaPowerOff } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"
import { useNavigate } from 'react-router-dom';
import { STROKE_COLOR,CURRENT_FUNCTION } from '../../recoil/Atoms';
import { useSetRecoilState } from "recoil";


const MoveSelections = (props) => {
    let navigate = useNavigate();
    let setStrokeColor=useSetRecoilState(STROKE_COLOR);
    let setCurrentFunction=useSetRecoilState(CURRENT_FUNCTION);

    const toolButtonStyle = {
        width:"50px", 
        height:"50px", 
        fontSize:"30px",
        borderRadius:"5px", 
        backgroundColor:"inherit",
        color: "white",
        border: "1px solid #B4A5A5",
        marginLeft: "10px"
    }

    function goBack(){
        setStrokeColor("#000000");
        setCurrentFunction("default");
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
        }
    }

    function logOut(){
        setStrokeColor("#000000");
        setCurrentFunction("default");
        localStorage.clear()
        navigate('/')
    }

    return(
        props.currentPage === "paint" ?
        <div style={{ display:"flex", position: "absolute", paddingTop: "1%", paddingLeft:"80%"}}>
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
        :
        <div style={{ display:"flex", position: "absolute", paddingTop: "3%", paddingLeft:"6%"}}>
            {
                props.currentPage === "intro"?
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
                props.currentPage === "setting" ||  props.currentPage === "customSetting"?
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
    )
}

export default MoveSelections;