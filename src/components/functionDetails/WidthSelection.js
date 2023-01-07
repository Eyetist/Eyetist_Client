import EyeButton from "../atoms/EyeButton"
import { useCanvas } from "../canvas/CanvasContext";
const WidthSelection=()=>{
    const { setWidth} = useCanvas()
    return(
        <div>
        <EyeButton 
            style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
            text="10"
            hoverColor="gray"
            clickColor="black"
            onClick={() => {setWidth(10)}}
        />
        <EyeButton 
            style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
            text="20"
            hoverColor="gray"
            clickColor="black"
            onClick={() => {setWidth(20)}}
        />
        <EyeButton 
            style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
            text="30"
            hoverColor="gray"
            clickColor="black"
            onClick={() => {setWidth(30)}}
        />
        </div>
    )
}

export default WidthSelection;