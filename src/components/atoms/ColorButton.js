import React, { useEffect, useRef, useState } from "react";
import { useCanvas } from "../canvas/CanvasContext";
import { useRecoilValue } from "recoil";
import { MOUSE_POS, IS_RIGHT_EYE_BLINK , IS_MOUSE_OPEN, CONTROLL_MODE} from '../../recoil/Atoms';

const ColorButton = (props) => {
    let isMouseOpen = useRecoilValue(IS_MOUSE_OPEN)
    let mousePos = useRecoilValue(MOUSE_POS)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)
    let controllMode = useRecoilValue(CONTROLL_MODE);
    let clickRef = useRef(false);
    let [buttonStyle, setButtonStyle] =useState(props.style);
    const buttonRef = useRef(null);
    const { setColor, canvasRef } = useCanvas()

    function setCurrentColor(){
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.strokeStyle = props.color;

        props.setStrokeColor(props.color)
    }

    function isOverlap(){
        if (buttonRef.current){
            const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = buttonRef.current;
            let posX = mousePos.x + 15 // 15 is mouseCursorSize / 2
            let posY = mousePos.y + 15
    
            return (offsetLeft <= posX && posX <= offsetLeft + offsetWidth) && (offsetTop <= posY && posY <= offsetTop + offsetHeight);

        }
    }

    useEffect( () => {
        if (isOverlap()){
            setButtonStyle({...buttonStyle, boxShadow: props.hoverBoxShadow})

            if ((controllMode === "mouth" && isMouseOpen) || (controllMode === "eye" && isRightEyeBlink)) {
                clickRef.current = true
                setButtonStyle({...buttonStyle, boxShadow: props.clickBoxShadow})
            }
        }
        else{
            setButtonStyle(props.style)
        }
    
        if (clickRef.current){
            if ((controllMode === "mouth" && !isMouseOpen) || (controllMode === "eye" && !isRightEyeBlink)) {
                setCurrentColor()
                clickRef.current = false
            }
        }
    }, [mousePos])

    return(
        <div ref={buttonRef} style={buttonStyle} />
    )
}

export default ColorButton;