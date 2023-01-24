import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SELECTED_SHAPE } from '../../recoil/Atoms';
import EyeButton from "../atoms/EyeButton";

const ShapeSelection=()=>{
    let [shapeButtonList,setShapeButtonList]=useState([]);
    let [selectedShape,setSelectedShape]=useRecoilState(SELECTED_SHAPE);

    const TOOL_BUTTON_SIZE = window.innerWidth * 0.04
    const TOOL_BUTTON_FONT_SIZE = window.innerWidth * 0.1;

    const cursorImage = {
        circle: require('../shapes/circle.png'),
        square: require('../shapes/square.png'),
        heart: require('../shapes/heart.png'),
        triangle: require('../shapes/triangle.png'),
        upArrow: require('../shapes/up-arrow.png'),
        downArrow: require('../shapes/down-arrow.png'),
        leftArrow: require('../shapes/left-arrow.png'),
        rightArrow: require('../shapes/right-arrow.png'),
        line:require('../shapes/line.png')
    }

    return(
        <div style={{display:"flex", alignItems:"center", justifyContent:"center",flexWrap:"wrap"}}>
            <div style={{width:"100%", height:"50px", justifyContent:"center", alignItems:"center", display:"flex", color:"white"}}>
                Selected : {selectedShape}
            </div>
            <EyeButton 
                style={{
                    width:"20%", 
                    height:"auto", 
                    fontSize:TOOL_BUTTON_FONT_SIZE,
                    borderRadius:"5px", 
                    backgroundColor: selectedShape === "Line" ? "white" : "inherit",
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
                }}
                text={<img src={cursorImage.line} style={{width:"100%", height:"auto"}} />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {setSelectedShape("Line")}}
            />
            <EyeButton 
                style={{
                    width:"20%", 
                    height:"auto", 
                    fontSize:TOOL_BUTTON_FONT_SIZE,
                    borderRadius:"5px", 
                    backgroundColor: selectedShape === "Circle" ? "white" : "inherit",
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
                }}
                text={<img src={cursorImage.circle} style={{width:"100%", height:"auto"}} />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {setSelectedShape("Circle")}}
            />
            <EyeButton 
                style={{
                    width:"20%", 
                    height:"auto", 
                    fontSize:TOOL_BUTTON_FONT_SIZE,
                    borderRadius:"5px", 
                    backgroundColor: selectedShape === "Square" ? "white" : "inherit",
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
                }}
                text={<img src={cursorImage.square} style={{width:"100%", height:"auto"}} />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {setSelectedShape("Square")}}
            />
            <EyeButton 
                style={{
                    width:"20%", 
                    height:"auto", 
                    fontSize:TOOL_BUTTON_FONT_SIZE,
                    borderRadius:"5px", 
                    backgroundColor: selectedShape === "Triangle" ? "white" : "inherit",
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
                }}
                text={<img src={cursorImage.triangle} style={{width:"100%", height:"auto"}} />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {setSelectedShape("Triangle")}}
            />
            <EyeButton 
                style={{
                    width:"20%", 
                    height:"auto", 
                    fontSize:TOOL_BUTTON_FONT_SIZE,
                    borderRadius:"5px", 
                    backgroundColor: selectedShape === "Heart" ? "white" : "inherit",
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
                }}
                text={<img src={cursorImage.heart} style={{width:"100%", height:"auto"}} />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {setSelectedShape("Heart")}}
            />
            <EyeButton 
                style={{
                    width:"20%", 
                    height:"auto", 
                    fontSize:TOOL_BUTTON_FONT_SIZE,
                    borderRadius:"5px", 
                    backgroundColor: selectedShape === "UpArrow" ? "white" : "inherit",
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
                }}
                text={<img src={cursorImage.upArrow} style={{width:"100%", height:"auto"}} />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {setSelectedShape("UpArrow")}}
            />
            <EyeButton 
                style={{
                    width:"20%", 
                    height:"auto", 
                    fontSize:TOOL_BUTTON_FONT_SIZE,
                    borderRadius:"5px", 
                    backgroundColor: selectedShape === "DownArrow" ? "white" : "inherit",
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
                }}
                text={<img src={cursorImage.downArrow} style={{width:"100%", height:"auto"}} />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {setSelectedShape("DownArrow")}}
            />
            <EyeButton 
                style={{
                    width:"20%", 
                    height:"auto", 
                    fontSize:TOOL_BUTTON_FONT_SIZE,
                    borderRadius:"5px", 
                    backgroundColor: selectedShape === "LeftArrow" ? "white" : "inherit",
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
                }}
                text={<img src={cursorImage.leftArrow} style={{width:"100%", height:"auto"}} />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {setSelectedShape("LeftArrow")}}
            />
            <EyeButton 
                style={{
                    width:"20%", 
                    height:"auto", 
                    fontSize:TOOL_BUTTON_FONT_SIZE,
                    borderRadius:"5px", 
                    backgroundColor: selectedShape === "RightArrow" ? "white" : "inherit",
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
                }}
                text={<img src={cursorImage.rightArrow} style={{width:"100%", height:"auto"}} />}
                hoverColor="pink"
                clickColor="black"
                onClick={() => {setSelectedShape("RightArrow")}}
            />
        </div>
    )
}
export default ShapeSelection;