import React, { useEffect, useRef, useState } from "react";
import { useCanvas } from "../canvas/CanvasContext";
import { useRecoilValue } from "recoil";
import { MOUSE_POS, IS_RIGHT_EYE_BLINK } from '../../recoil/Atoms';

const ColorButton = (props) => {

    let mousePos = useRecoilValue(MOUSE_POS)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)
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
            let posX = mousePos.x + 25 // 25 is mouseCursorSize / 2
            let posY = mousePos.y + 25
    
            if ((offsetLeft <= posX && posX <= offsetLeft + offsetWidth) && (offsetTop <= posY && posY <= offsetTop + offsetHeight)){
                return true
            }
            return false
        }
    }

    useEffect( () => {
        if (isOverlap()){
            setButtonStyle({...buttonStyle, boxShadow: props.hoverBoxShadow})

            if (isRightEyeBlink){
                clickRef.current = true
                setButtonStyle({...buttonStyle, boxShadow: props.clickBoxShadow})
            }
        }
        else{
            setButtonStyle(props.style)
        }
    
        if (clickRef.current){
            if (!isRightEyeBlink){
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