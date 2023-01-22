import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { SELECTED_SHAPE } from '../../recoil/Atoms';
import EyeButton from "../atoms/EyeButton";

const ShapeSelection=()=>{
    let [shapeButtonList,setShapeButtonList]=useState([]);
    let setSelectedShape=useSetRecoilState(SELECTED_SHAPE);

    const TOOL_BUTTON_SIZE = window.innerWidth * 0.04
    const TOOL_BUTTON_FONT_SIZE = window.innerWidth * 0.1;

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
        paddingLeft:"3px",
        paddingRight:"3px",
        paddingTop:"3px",
        paddingBottom:"3px",
    }

    const cursorImage = {
        circle: require('../shapes/circle.png'),
        square: require('../shapes/square.png'),
        heart: require('../shapes/heart.png'),
        triangle: require('../shapes/triangle.png'),
        upArrow: require('../shapes/up-arrow.png'),
        downArrow: require('../shapes/down-arrow.png'),
        leftArrow: require('../shapes/left-arrow.png'),
        rightArrow: require('../shapes/right-arrow.png')

    }

    return(
        <div style={{display:"flex", alignItems:"center", justifyContent:"center",flexWrap:"wrap"}}>
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
            <EyeButton 
                style={toolButtonStyle}
                text={<img src={cursorImage.upArrow} style={{width:"100%", height:"auto"}} />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {setSelectedShape("upArrow")}}
            />
            <EyeButton 
                style={toolButtonStyle}
                text={<img src={cursorImage.downArrow} style={{width:"100%", height:"auto"}} />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {setSelectedShape("downArrow")}}
            />
            <EyeButton 
                style={toolButtonStyle}
                text={<img src={cursorImage.leftArrow} style={{width:"100%", height:"auto"}} />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {setSelectedShape("leftArrow")}}
            />
            <EyeButton 
                style={toolButtonStyle}
                text={<img src={cursorImage.rightArrow} style={{width:"100%", height:"auto"}} />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {setSelectedShape("rightArrow")}}
            />
        </div>
    )
}
export default ShapeSelection;