import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { MOUSE_POS, IS_RIGHT_EYE_BLINK, IS_MOUSE_OPEN, CONTROLL_MODE } from '../../recoil/Atoms';
import "./EyeButton.css"

const EyeButton = (props) => {
    let isMouseOpen = useRecoilValue(IS_MOUSE_OPEN)
    let mousePos = useRecoilValue(MOUSE_POS)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)
    let controllMode = useRecoilValue(CONTROLL_MODE);
    let clickRef = useRef(false);
    let [buttonStyle, setButtonStyle] =useState(props.style);
    const buttonRef = useRef(null);

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
            if (props.hoverFontColor){
                setButtonStyle({...buttonStyle, color: props.hoverFontColor})
            }
            else{
                setButtonStyle({...buttonStyle, backgroundColor: props.hoverColor})
            }

            if ((controllMode === "mouth" && isMouseOpen) || (controllMode === "eye" && isRightEyeBlink)) {
                clickRef.current = true
                setButtonStyle({...buttonStyle, backgroundColor: props.clickColor})
            }
        }
        else{
            setButtonStyle(props.style)
        }
    
        if (clickRef.current){
            if ((controllMode === "mouth" && !isMouseOpen) || (controllMode === "eye" && !isRightEyeBlink)) {
                props.onClick() 
                clickRef.current = false
            }
        }
    }, [mousePos])

    return(
        <div className="eye-button" ref={buttonRef} style={buttonStyle}>
            {props.text}
        </div>
    )
}

export default EyeButton