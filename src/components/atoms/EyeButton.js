import React, { useRef } from "react";
import { useRecoilValue } from "recoil";
import { MOUSE_POS, IS_RIGHT_EYE_BLINK } from '../../recoil/Atoms';
import "./EyeButton.css"

const EyeButton = (props) => {
    let mousePos = useRecoilValue(MOUSE_POS)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)
    const buttonRef = useRef(null);
    let buttonStyle = props.style

    function isOverlap(){
        if (buttonRef.current){
            const { offsetTop, offsetLeft, offsetWidth, offsetHeight} = buttonRef.current;
            let posX = mousePos.x + 25 // 25 is mouseCursorSize / 2
            let posY = mousePos.y + 25
    
            if ((offsetLeft <= posX && posX <= offsetLeft + offsetWidth) && (offsetTop <= posY && posY <= offsetTop + offsetHeight)){
                return true
            }
            return false
        }
    }

    if (isOverlap()){
        buttonStyle.backgroundColor = props.hoverColor
        if (isRightEyeBlink){
            buttonStyle.backgroundColor = props.clickColor
            props.onClick()
        }
    }

    return(
        <div className="eye-button" ref={buttonRef} style={buttonStyle}>
            {props.text}
        </div>
    )
}

export default EyeButton