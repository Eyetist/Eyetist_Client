import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { SELECTED_SHAPE } from '../../recoil/Atoms';
import EyeButton from "../atoms/EyeButton";

const ShapeSelection=()=>{
    let [shapeButtonList,setShapeButtonList]=useState([]);
    let setSelectedShape=useSetRecoilState(SELECTED_SHAPE);

    const TOOL_BUTTON_SIZE = window.innerWidth * 0.04
    const TOOL_BUTTON_FONT_SIZE = window.innerWidth * 0.02

    const toolButtonStyle = {
        width:"30%", 
        height:"auto", 
        fontSize:TOOL_BUTTON_FONT_SIZE,
        borderRadius:"5px", 
        backgroundColor:"inherit",
        color: "white",
        border: "1px solid #B4A5A5",
        marginLeft: "10px",
        marginRight: "10px",
        marginTop: "5px",
        marginBottom: "5px",
    }

    const cursorImage = {
        circle: require('../shapes/circle.png'),
        square: require('../shapes/square.png'),
        heart: require('../shapes/heart.png'),
        triangle: require('../shapes/triangle.png')
    }

    return(
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <EyeButton 
                style={toolButtonStyle}
                text={<img src={cursorImage.circle} style={{width:"100%", height:"auto"}} />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {setSelectedShape("circle")}}
            />
            <EyeButton 
                style={toolButtonStyle}
                text={<img src={cursorImage.square} style={{width:"100%", height:"auto"}} />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {setSelectedShape("square")}}
            />
            <EyeButton 
                style={toolButtonStyle}
                text={<img src={cursorImage.triangle} style={{width:"100%", height:"auto"}} />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {setSelectedShape("triangle")}}
            />
            <EyeButton 
                style={toolButtonStyle}
                text={<img src={cursorImage.heart} style={{width:"100%", height:"auto"}} />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {setSelectedShape("heart")}}
            />
        </div>
    )
}
export default ShapeSelection;