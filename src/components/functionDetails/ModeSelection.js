import EyeButton from "../atoms/EyeButton"
import { AiFillEye } from "react-icons/ai"
import { GiLips } from "react-icons/gi"
import { WINDOW_SIZE, CONTROLL_MODE } from '../../recoil/Atoms';
import { useRecoilValue, useRecoilState } from "recoil";


const ModeSelection = (props) => {
    let windowSize=useRecoilValue(WINDOW_SIZE);
    let [controllMode, setControllMode] = useRecoilState(CONTROLL_MODE);
    const TOOL_BUTTON_SIZE = windowSize.width * 0.04
    const TOOL_BUTTON_FONT_SIZE = windowSize.width * 0.02

    return(
        props.page === "paint" ?
        <div style={{ position: "absolute", paddingTop: "1%", paddingLeft:"37%", display:"flex"}}>
            <span style={{color:"white", paddingLeft:"40px"}}>
                MODE SELECTION
            </span>
            <EyeButton 
                style={{
                    width: "200px", 
                    height: "50px", 
                    fontSize:"50px",
                    borderRadius:"5px", 
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
                    width: "200px", 
                    height: "50px", 
                    fontSize:"50px",
                    borderRadius:"5px", 
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
        :
        <div style={{ position: "absolute", paddingTop: "3%", paddingLeft:"5%"}}>
            <span style={{color:"white", paddingLeft:"40px"}}>
                MODE SELECTION
            </span>
            <EyeButton 
                style={{
                    width: "200px", 
                    height: "50px", 
                    fontSize:"50px",
                    borderRadius:"5px", 
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
                    width: "200px", 
                    height: "50px", 
                    fontSize:"50px",
                    borderRadius:"5px", 
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
    )
}

export default ModeSelection;