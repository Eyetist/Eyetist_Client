import EyeButton from "../atoms/EyeButton"
import { useCanvas } from "../canvas/CanvasContext";
const ColorSelection=()=>{
    const { setColor} = useCanvas()
    return(
        <div>
        <EyeButton 
            style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
            text="black"
            hoverColor="gray"
            clickColor="black"
            onClick={() => {setColor("black")}}
        />
        <EyeButton 
            style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
            text="white"
            hoverColor="gray"
            clickColor="black"
            onClick={() => {setColor("white")}}
        />
        <EyeButton 
            style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
            text="red"
            hoverColor="gray"
            clickColor="black"
            onClick={() => {setColor("red")}}
        />
        <EyeButton 
            style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
            text="orange"
            hoverColor="gray"
            clickColor="black"
            onClick={() => {setColor("orange")}}
        />
        <EyeButton 
            style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
            text="yellow"
            hoverColor="gray"
            clickColor="black"
            onClick={() => {setColor("yellow")}}
        />
        <EyeButton 
            style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
            text="green"
            hoverColor="gray"
            clickColor="black"
            onClick={() => {setColor("green")}}
        />
        <EyeButton 
            style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
            text="blue"
            hoverColor="gray"
            clickColor="black"
            onClick={() => {setColor("blue")}}
        />
        <EyeButton 
            style={{width:"100px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
            text="purple"
            hoverColor="gray"
            clickColor="black"
            onClick={() => {setColor("purple")}}
        />
        </div>
    )
}

export default ColorSelection;